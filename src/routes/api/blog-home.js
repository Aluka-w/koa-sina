/**
 * @description weibo-home api router
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheckx')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ content, image, userId })
})

module.exports = router
