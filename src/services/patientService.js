const db = require("../models/index.js");

const booking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // await db.Booking.bulkCreate(data);
      await db.Booking.create(data);
      // const dataSchedule = db.Schedule.findAll({});
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  booking,
};
