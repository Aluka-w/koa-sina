/**
 * @description user API 路由
 * @author Matt
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../util/env')
const { loginCheck } = require('../../middlewares/loginCheckx')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender,
  })
})

// 用户是否存在
router.post('/isExist', async (ctx, nex) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, nex) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, nex) => {
  if (isTest) {
    // 测试环境下, 测试账号登录之后, 删除自己(单元测试, 测试完清空测试数据)
    const { userName } = ctx.session.userInfo
    // 调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router
