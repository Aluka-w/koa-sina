/**
 * @description weibo view router
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheckx')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 登录用户信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params

  let curInfo
  const isMe = curUserName === myUserName
  // 查询当前登录用户
  if (isMe) {
    curInfo = myUserInfo
  } else {
    // 查询的不是当前用户
    const existReult = await isExist(curUserName)
    if (existReult.errno !== 0) {
      // 用户名不存在
      return
    }
    curInfo = existReult.data
  }

  // 获取第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
 
  // 获取粉丝
  const fansResult = await getFans(curInfo.id)
  const { count: fansCount, list: fansList } = fansResult.data

  // 获取关注人
  const followersResult = await getFollowers(curInfo.id)
  const { count: followCount, userList: followList } = followersResult.data
  
  // 我是否关注了此人
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followCount,
        list: followList
      },
      amIFollowed
    },
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  })
})


module.exports = router
