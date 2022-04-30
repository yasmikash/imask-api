const axios = require("axios");

const Analyze = require("../schemas/analyze");

module.exports.calculateData = async (data, user) => {
  const bpm = await analyzeRespiratory(data.respiratory);
  const spo2 = await analyzeSPO2(data.spo2);
  const temperature = await analyzeTemperature(data.temperature);
  const heartRate = await analyzeHeartRate(data.heartRate);
  const isCough = 1;
  const coughRate = 4.001;

  // [sex, age, temp in celcius, heart rate, respiratory rate, spo2, iscough, coughrate]
  const finalStatusParams = [
    1,
    64,
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
