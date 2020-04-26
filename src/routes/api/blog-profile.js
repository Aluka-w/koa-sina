/**
 * @description 个人主页 api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheckx')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../util/blog')
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(parseInt)
  const result = await getProfileBlogList(userName, parseInt)

  // 返回为渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  console.log(12344, result);
  ctx.body = result
})

module.exports = router
