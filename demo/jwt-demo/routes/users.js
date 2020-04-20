const router = require("koa-router")()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constant')
const util = require('util') // node js自带的工具
const verify = util.promisify(jwt.verify) // 把jwt加工成promise的方式

router.prefix("/users")
// 用户认证成功之后, 返回加密的token给客户端
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body
  let userInfo
  if (userName === "zhangsan" && password === "abc") {
    // 登录成功, 获取登录信息
    userInfo = {
      useId: 1,
      userName: "zhangsan",
      nickName: "张三",
      gender: 1, // 男
    }
  }
  // 加密userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: "登录失败",
    }
    return 
  }
  ctx.body = {
    errno: -0,
    data: token,
  }
})
// 客户端后续每次请求都带token, 以示用户身份
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (error) {
    ctx.body = {
      errno: -1,
      userInfo: '失败'
    }
  }
})

module.exports = router

for (let i = 0; i < array.length; i++) {
  const element = array[i];
  
}
