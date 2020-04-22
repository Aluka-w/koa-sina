/**
 * @description 微博数据建模
 */
const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

// user
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容',
  },
  image: {
    type: STRING,
    comment: '图片地址',
  },
})

module.exports = Blog