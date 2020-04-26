/**
 * @description 数据格式化
 * @author Matt
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../util/dt')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  //
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if (list == null) {
    return list
  }
  // 用户列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }
  // 单个对象
  return _formatUserPicture(list)
}


/**
 * 格式化时间
 * @param {Object} obj 对象
 */
function _formatBlogTime(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }
  // 微博列表
  if (list instanceof Array) {
    return list.map(_formatBlogTime)
  }
  // 单个对象
  return _formatBlogTime(list)
}

module.exports = {
  formatUser,
  formatBlog
}
