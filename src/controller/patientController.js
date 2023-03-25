const patientService = require("../services/patientService.js");

const booking = async (req, res) => {
  try {
    let schedule = [
      { doctorId: 3, date: "2022-03-04" },
      { doctorId: 4, date: "2022-03-05" },
    ];
    let book = req.body;
    if (!book) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "no book",
      });
    }
    let dataBook = await patientService.booking(book);
    console.log(">>>Check dataSchedule", dataBook);
    return res.status(200).json({
      errCode: 0,
      dataBook: book,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "ERROR roi",
    });
  }
};

module.exports = {
  booking,
};
