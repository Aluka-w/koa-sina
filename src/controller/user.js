/**
 * @description user controller
 * @author Matt
 */
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerIsNotExist } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  // 已存在 { errno: 0, data }
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    // 不存在 { errno: 1003, message }
    return new ErrorModel(registerIsNotExist)
  }
}

module.exports = {
  isExist,
}
