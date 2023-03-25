// import db from "../models/index.js";
const { JsonWebTokenError } = require("jsonwebtoken");
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService.js");
require("dotenv").config();

const getInfDoctor = async (req, res) => {
  try {
    let doctor = await userService.getDoctor();
    console.log(">>> check doctor", doctor);
    return res.status(200).json(doctor);
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "No data",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        errMessage: "missing email or password",
      });
    }
    let userData = await userService.handleUserLogin(email, password);
    if (userData.errCode != 1) {
      const accessToken = jwt.sign(
        {
          id: userData.id,
          name: userData.fulltName,
          role: userData.typeRole,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "30d" }
      );
      const refreshToken = jwt.sign(
        {
          id: userData.id,
          name: userData.fulltName,
          role: userData.typeRole,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "30d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        errCode: 0,
        data: userData,
        accessToken: accessToken,
        // refreshToken: refreshToken,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        message: "email or password is wrong",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "that bai",
    });
  }
};

const getTime = async (req, res) => {
  try {
    let dataTime = await userService.getDataTime();
    return res.status(200).json({
      errCode: 0,
      dataTime: dataTime,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "no time data",
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      errCode: 0,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errCode: 1,
      errMessage: "log out failed",
    });
  }
};

const createAcc = async (req, res) => {
  try {
    let data = req.body.data;
    if (!data) {
      console.log("missing params");
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing params",
      });
    } else {
      let user = await userService.createAcc(data);
      console.log("thanh cong");
      return res.status(200).json({
        errCode: 0,
        user: user,
      });
    }
    // let data = {
    //   fulltName: "mvs",
    //   email: "mvs",
    //   password: "123",
    //   address: "tuyen quang",
    // };
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "create account failed",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let typeRole = req.query.typeRole;
    if (!typeRole) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing params typeRole",
      });
    }
    let data = await userService.getAllUsers(typeRole);
    return res.status(200).json({
      errCode: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "get all users failed",
    });
  }
};

module.exports = {
  getInfDoctor: getInfDoctor,
  handleLogin: handleLogin,
  getTime: getTime,
  logoutUser,
  createAcc,
  getAllUsers,
};
