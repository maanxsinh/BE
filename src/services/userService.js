const { raw } = require("body-parser");
const db = require("../models/index.js");
const { QueryTypes } = require("sequelize");
var Sequelize = require("sequelize");

const getDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let infDoctor = {};
      let data = await db.User.findAll({
        where: { typeRole: "Doctor" },
        attributes: {
          exclude: ["password"],
        },
      });
      raw: true;
      infDoctor = data;
      console.log(">>>> check data", data);
      resolve(infDoctor);
    } catch (e) {
      reject(e);
      console.log(">>> LOI ROI NKA", e);
    }
  });
};

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        //co ton tai
        let user = await db.User.findOne({
          where: { email: email },
        });
        console.log(">>>password's user", user.password);
        if (password === user.password) {
          resolve(user);
        } else {
          userData.errCode = 1;
          userData.errMessage = "wrong password";
          resolve(userData);
        }
      } else {
        //nguoi dung k ton tai
        userData.errCode = 1;
        userData.errMessage = "nguoi dung khong ton tai";
        console.log(">>> check userData", userData);
        console.log(">>> isExist", isExist);
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDataTime = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let time = {};
      let data = await db.AllCode.findAll({
        where: { type: "TIME" },
      });
      time = data;
      console.log(time);
      resolve(time);
    } catch (e) {
      reject(e);
    }
  });
};

const createAcc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = (inputRole) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        where: { typeRole: inputRole },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDoctor: getDoctor,
  handleUserLogin: handleUserLogin,
  checkEmail: checkEmail,
  getDataTime: getDataTime,
  createAcc,
  getAllUsers,
};
