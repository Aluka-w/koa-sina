/**
 * @description 个人主页 api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheckx')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../util/blog')
const { follow, unFollow } = require('../../controller/user-relation')
router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)

  // 返回为渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  // console.log(12344, result);
  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  // 获取微博数据，第一页
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  // 获取微博数据，第一页
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})


module.exports = router
