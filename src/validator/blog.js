/**
 * @description weibo 数据格式校验
 * @author Matt
 */
const _validae = require('./_validae')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    iamge: {
      type: 'string',
      maxLength: 255,
    },
  },
}

/**
 * 校验weibo数据格式
 * @param {Object} data weibo数据
 */
function blogValidate(data = {}) {
  return _validae(SCHEMA, data)
}

module.exports = blogValidate
