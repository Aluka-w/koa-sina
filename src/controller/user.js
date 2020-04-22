/**
 * @description user controller
 * @author Matt
 */
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../util/cryp')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require('../model/ErrorInfo')
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
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} gender 性别(1-男, 2-女, 3-保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户已注册
    return new ErrorModel(registerUserNameExistInfo)
  }
  // 注册
  try {
    // md5 加密密码
    await createUser({ userName, password: doCrypto(password), gender })
    return new SuccessModel() // 成功, code = 0就好
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param {Objec} ctx koa ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // console.log(123, userInfo, loginFailInfo);
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 更改用户信息
 * @param {Object} ctx ctx
 * @param {string} ninckName 昵称
 * @param {string} city 城市
 * @param {string} picture 图片
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // 更新成功返回ture
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  )
  if (result) {
    Object.assign(ctx.session.userInfo, { nickName, city, picture })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 更改密码
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function changePassword({ userName, password, newPassword }) {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) }
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 登出
 * @param {ctx} ctx ctx
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}
