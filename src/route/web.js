// import express from "express";
const express = require("express");
const APIController = require("../controller/APIController");
const doctorController = require("../controller/doctorController");
const patientController = require("../controller/patientController");
const JWTactions = require("../middleware/JWTactions");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world");
  });
  router.get("/getInfDoctor", APIController.getInfDoctor);
  router.post("/login", APIController.handleLogin); // JWTactions.verifyToken,
  router.get("/getTime", APIController.getTime);
  router.get("/getAppointment", doctorController.getAppointment);
  router.get("/getAllUsers", APIController.getAllUsers);
  router.get("/getDetailDoctor", doctorController.getDetailDoctor);

  router.post("/booking", patientController.booking);
  router.post("/requestRefreshToken", JWTactions.requestRefreshToken);
  router.post("/logout", APIController.logoutUser);
  router.post("/createAcc", APIController.createAcc);
  router.post("/confirmApm", doctorController.confirmAppointment);

  // router.get("/getBacSi", APIController.getBacSi);
  // // router.get("/allcode", APIController.getAllCode);

  return app.use("/", router);
};

// export default initWebRoutes;

module.exports = initWebRoutes;
