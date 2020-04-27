/**
 * @description 用户关系 controller
 */
const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 根据 userId 获取粉丝列表
 * @param {number} userId 用户id
 */
async function getFans(userId) {
  const { count, list } = await getUsersByFollower(userId)
  return new SuccessModel({
    count, list
  })
}

module.exports = {
  getFans,
}
