# KOA2(仿新浪)

## 技术选型

1. 框架(koa2 vs express vs egg)
2. 前端页面(ejs vs react)
3. 数据库(mysql vs mongdb) - (mysql 和 sequlize)
4. 登录技术(session vs jwt)
5. 缓存数据库(redis)
6. 单元测试(jest)

### KOA2

1. 安装: yarn global add koa-generator(yarn/npm)
2. 使用: koa2 -e koa-sina(-e 使用 ejs 模板引擎)

> tip 设置环境变量: cross-env NODE_ENV=dev

#### koa2 常用 Api

```txt
  1. ctx.body:
  2. ctx.request.body:
  3. ctx.query
  4. ctx.params
  5. ctx.session
  6. ctx.cookies
```

#### koa2 路由

```js
// 前置路由
router.prefix('/api')
// 动态路由
router.get('/profile/:username/:page', async function (ctx, next) {
  // 获取动态路由参数
  const { username, page } = ctx.params
  ctx.body = { username, page }
})
// 路由合起来就是: /api/profile/zhangsan
```

### ejs

1. 概念: 服务端模板渲染引擎, 类似的有jade, art-template

#### 变量

#### 判断和循环

#### 引用组件
