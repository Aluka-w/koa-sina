/**
 * @description json schema 校验
 * @author Matt
 */

const Ajv = require('ajv')

const ajv = new Ajv({
  // allErrors: true // 输出所有错误(慢)
})

/**
 * json schema 验证
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate