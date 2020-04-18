const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
const { REDIS_CONF } = require("./conf/db")
const { SEESION_SECRET_KEY } = require('./conf/secretKeys')

const userViewRouter = require("./routes/view/user")
const userApiRouter = require("./routes/api/user")
const errorViewRouter = require("./routes/view/error")

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
)
app.use(json())
app.use(logger())
app.use(require("koa-static")(__dirname + "/public"))

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// session 配置
app.keys = [SEESION_SECRET_KEY] // 密钥
app.use(
  session({
    key: "weibo.sid", // cookie 的id 默认是koa.sid
    prefix: "weibo.sess", // redis key 的前缀, 默认 koa:sess
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // ms
    },
    // ttl: 24 * 60 * 60 * 1000, // redis 过期时间, 默认跟cookie过期时间一致
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
)

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // error 404的路由一定在最后

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx)
})

module.exports = app
