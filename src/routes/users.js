const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/profile/:username', function (ctx, next) {
  ctx.body = { username: ctx.params.username}
})

module.exports = router
