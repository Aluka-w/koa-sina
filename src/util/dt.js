/**
 * @description 时间相关工具函数
 */
const { format } = require('date-fns')


/**
 * 格式化时间 如09.25 23:21
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), "MM.dd HH:mm")
}

module.exports = {
  timeFormat
}