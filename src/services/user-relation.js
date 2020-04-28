/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/modal')
const { formatUser } = require('./_format')
 /**
  * 获取粉丝列表
  * @param {number} followerId 被关注人的 id
  */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [ ['id', 'desc'] ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 返回的列表
  // 用户格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    list: userList
  }
}
/**
 * 关注
 * @param {number} userId 关注人
 * @param {number} followerId 被关注人
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}
/**
 * 取消关注
 * @param {number} userId 关注人
 * @param {number} followerId 被关注人
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}