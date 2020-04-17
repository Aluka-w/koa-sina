/**
 * @description user API 路由
 * @author Matt
 */

 const router = require('koa-router')()

 router.prefix('/api/user')

 // 注册路由
 router.post('/register', async (ctx, next) => {

 })

// 用户是否存在
router.post('isExist', async (ctx, nex) => {
  const { userName } = ctx.request.body
})

module.exports = router