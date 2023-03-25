const db = require("../models/index.js");

const getAppointment = (inputId, inputStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.findAll({
        where: { doctorId: inputId, statusId: inputStatus },
        include: [{ model: db.User }],
      });
      console.log(">>>check data", data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const confirmAppointment = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.update(
        { statusId: "CONFIRMED" },
        { where: { statusId: "NEW", doctorId: inputId } }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailDoctor = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Detail.findAll({
        where: { doctorId: inputId },
        include: [{ model: db.User }],
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { getAppointment, confirmAppointment, getDetailDoctor };
