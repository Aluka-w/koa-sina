/**
 * @description 用户关系 controller
 */
const {
  getUsersByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower,
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo')

/**
 * 根据 userId 获取粉丝列表
 * @param {number} userId 用户id
 */
async function getFans(userId) {
  const { count, list } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    list,
  })
}

async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count,
    userList,
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow,
}
