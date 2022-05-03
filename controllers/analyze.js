const axios = require("axios");
const FormData = require("form-data");
const User = require("../schemas/user");
const Analyze = require("../schemas/analyze");

module.exports.calculateData = async (data, coughFile, user) => {
  const { isCough, coughRate } = await analyzeCough(coughFile);
  const bpm = await analyzeRespiratory(data.respiratory);
  const spo2 = await analyzeSPO2(data.spo2);
  const temperature = await analyzeTemperature(data.temperature);
  const heartRate = await analyzeHeartRate(data.heartRate);

  const maskUser = await User.findById(user.id);

  let userSex;
  if (maskUser.gender === "male") userSex = 1;
  if (maskUser.gender === "female") userSex = 0;
  const userAge = maskUser.age;

  // [sex, age, temp in celcius, heart rate, respiratory rate, spo2, iscough, coughrate]
  const finalStatusParams = [
    userSex,
    userAge,
    temperature,
    heartRate,
    bpm,
    spo2,
    isCough,
    coughRate,
  ];

  const finalCOVIDStatus = await analyzeFinalStatus(finalStatusParams);

  const result = {
    bpm,
    spo2,
    temperature,
    heartRate,
    isCough,
    coughRate,
    covidStatus: finalCOVIDStatus.status,
    covidStatusProbability: finalCOVIDStatus.probability,
  };

  const analyze = new Analyze({ ...result, user: user.id, date: new Date() });
  await analyze.save();

  return result;
};

async function analyzeRespiratory(data) {
  try {
    const result = await axios.post(
      "http://imask.southeastasia.cloudapp.azure.com:5000/breathing",
      {
        readings: data,
      }
    );
    return result.data.bpm;
  } catch (error) {
    throw new Error("Model error occured");
  }
}

async function analyzeCough(file) {
  try {
    const formData = new FormData();
    formData.append("file", file, {
      filename: "split0_1.wav",
      contentType: "audio/wave",
    });

    const result = await axios.post(
      "http://imask.southeastasia.cloudapp.azure.com:5002/cough",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return { isCough: result.data.isCough, coughRate: result.data.cough_rate };
  } catch (error) {
    console.log(error);
    throw new Error("Model error occured");
  }
}

async function analyzeHeartRate(data) {
  try {
    const result = await axios.post(
      "http://imask.southeastasia.cloudapp.azure.com:5003/heartrate",
      {
        readings: data,
      }
    );
    return result.data.beats;
  } catch (error) {
    throw new Error("Model error occured");
  }
}

async function analyzeSPO2(data) {
  try {
    const result = await axios.post(
      "http://ec2-3-110-217-150.ap-south-1.compute.amazonaws.com:5003/oxygenlevel",
      {
        data: data,
      }
    );
    return result.data;
  } catch (error) {
    throw new Error("Model error occured");
  }
}

async function analyzeTemperature(data) {
  try {
    const result = await axios.post(
      "http://ec2-3-110-217-150.ap-south-1.compute.amazonaws.com:5001/temperature",
      {
        data: data,
      }
    );
    return parseFloat(result.data.temperature);
  } catch (error) {
    throw new Error("Model error occured");
  }
}

async function analyzeFinalStatus(data) {
  try {
    const result = await axios.post(
      "http://ec2-3-110-217-150.ap-south-1.compute.amazonaws.com:5002/status",
      {
        data: data,
      }
    );
    return {
      probability: parseFloat(result.data.probability),
      status: parseFloat(result.data.status),
    };
  } catch (error) {
    throw new Error("Model error occured");
  }
}
