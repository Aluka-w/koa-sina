/**
 * @description user services
 * @author Matt
 */
const { User } = require('../db/modal/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName,
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  })
  if (result == null) {
    // 未找到
    return result
  }
  return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  })
  return result.dataValues
}
/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  console.log(userName);
  const result = await User.destroy({
    where: {
      userName,
    },
  })
  // resule 删除的行数
  return result > 0
}

async function updateUser(
  { newNickName, newCity, newPicture, newPassword },
  { userName, password }
) {
  // 拼接修改的内容
  const updateDate = {}
  if (newNickName) {
    updateDate.nickName = newNickName
  }
  if (newCity) {
    updateDate.city = newCity
  }
  if (newPicture) {
    updateDate.picture = newPicture
  }
  if (newPassword) {
    updateDate.password = newPassword
  }
  // 拼接查询条件
  const whereOpt = {
    userName,
  }
  if (password) {
    whereOpt.password = password
  }
  // 执行语句
  const result = await User.update(updateDate, {
    where: whereOpt
  })
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
