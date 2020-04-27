/**
 * @description 关注列表
 */
const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('UserRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '关注人 id'
  },
})

module.exports = UserRelation