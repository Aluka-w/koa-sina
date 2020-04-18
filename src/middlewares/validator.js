/**
 * @description json schema 验证中间件
 * @author Matt
 */

 const { ErrorModel } = require('../model/ResModel')
 const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

 /**
  * 生成json shcema 验证的中间件
  * @param {function} validateFn 验证函数
  */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return 
    }
    // 验证成功
    next()
  } 
  return validator
}

module.exports = {
  genValidator
}