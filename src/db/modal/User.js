/**
 * @description 用户数据模型
 */
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// user
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别(1-男, 2-女, 3-保密)',
    defaultValue: 3
  },
  picture: {
    type: STRING,
    comment: '图片地址',
  },
  city: {
    type: STRING,
    comment: '地址',
  },
})

module.exports = User
