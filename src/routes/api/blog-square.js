/**
 * @description 广场 API 路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheckx')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../util/blog')

router.prefix('/api/square')

router.get('/square/:pageIndex', loginCheck, async(ctx, next) => {
  const { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router