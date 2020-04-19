/**
 * @description user view 路由
 */
const router = require('koa-router')()

// router.prefix('/users')

/**
 * 获取登录信息
 * @param {Object} ctx koa ctx
 */
function getLoginIngo(ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginIngo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginIngo(ctx))
})

module.exports = router
