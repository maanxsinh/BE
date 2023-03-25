const db = require("../models/index.js");
const doctorService = require("../services/doctorService");

const getAppointment = async (req, res) => {
  try {
    let doctorId = req.query.doctorId;
    let statusId = req.query.statusId;
    if (!doctorId || !statusId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing params",
      });
    }
    let apm = await doctorService.getAppointment(doctorId, statusId);
    return res.status(200).json({
      errCode: 0,
      appointment: apm,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "get appointment failed",
    });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    let doctorId = req.body.doctorId;
    if (!doctorId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing params",
      });
    }
    let data = await doctorService.confirmAppointment(doctorId);
    return res.status(200).json({
      errCode: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "confirm appointment failed",
    });
  }
};

const getDetailDoctor = async (req, res) => {
  try {
    doctorId = req.query.doctorId;
    if (!doctorId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing params",
      });
    }
    let data = await doctorService.getDetailDoctor(doctorId);
    return res.status(200).json({
      errCode: 0,
      data: data,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "get detail doctor failed",
    });
  }
};

module.exports = {
  getAppointment,
  confirmAppointment,
  getDetailDoctor,
};
