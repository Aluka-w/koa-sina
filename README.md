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

概念: 服务端模板渲染引擎, 类似的有 jade, art-template

#### ejs 语法

1. server 服务器

```js
// app.js中已经配置ejs模板引擎指向
router.get('/', async (ctx, next) => {
  // 指向ejs index, 传递变量title
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: '11',
      },
      {
        id: 2,
        title: '22',
      },
    ],
  })
})
```

##### 变量

```ejs
  <h1><%= title %></h1>
  <!-- 不确定是否传的locals, 到时候解析为空 -->
  <h1><%= locals.name %></h1>
```

##### 判断

ejs 模板使用判断和循环

```ejs
  <div>
    <% if (isMe) { %>
      <h1><%= title %></h1>
    <% } else {%>
      <h1>测试</h1>
    <% } %>
  </div>
```

##### 引用组件

```ejs
  <!-- 引入组件的路径 -->
  <%- include('view/index', {
    <!-- 传递到子组件参数 -->
    isMe
  }) %>
```

##### 循环

```ejs
  <ul>
    <% blogList.forEach(blog => { %>
      <li><%= blog.title %></li>
    <% }) %>
  </ul>
```

> ejs 组件内部(html)可以使用 script 标签写 js, ejs 本质就是 SSR(服务端渲染)

### MYSQL

#### 基础 SQL

1. 增(id 的自增不会考虑你删除的, 就只是一直增)

   ```sql
   -- 给某个表新增数据
   insert into users(username, `password`, realname) value('zhangshan', '123', '张三');
   ```

2. 删 一般不会真的删除, 只是多加字段 state, 1 代表存在, 0 代表不存在

   ```sql
   -- 清除所有的表
   delete from users;
   -- 清除某条数据
   delete from users where username='zhangshan';
   ```

3. 改 软删除, 只是更新状态

   ```sql
   -- 把所有数据realname都改成',lisi'
   update users set realname='lisi';
   -- 更新某条数据(可能会报错, 解决在5)
   update users set realname='lisi' where username='lisi';
   ```

4. 查

   ```sql
    -- 展示数据库的所有表
    show tables;
    -- 查询表中所有列, 慎用*, 影响性能
    select * from users;
    -- 查询列中某些列
    select id, username from users;
    -- 查询某条数据(交集)
    select * from users where username='zhangshan' and `password`='123';
    -- 查询并集
    select * from users where username='zhangshan' or `password`='123';
    -- 模糊查询
    select * from users where username like '%zhang%'
    -- 模糊查询,并排序(默认正序从小到大)
    select * from users where `password` like '%1%' order by id;
    -- 模糊查询,并排序(倒序)
    select * from users where `password` like '%1%' order by id desc;
    -- 不等于<>
    select * from users where state <> '0';
    -- 查询总数, 返回总数(sum: 4)
    select count(*) as sum from blogs
    select count(id) as sum from blogs
    -- 分页, limit 2 每页两行, offset 2, 跳过两行(即第二页日开始)
    select * from blogs by id desc limit 2 offset 2
    -- 连表查询(不一定非得外键约束), 不一定非得有userid.id=blogs.userid
    select * blogs inner join users on userid.id=blogs.userid
    -- 连表查询(不包含users的id), 加查询条件, 注意blogs.*
    select blogs.*, users.username, users.nickname from blogs
    inner join users on userid.id=blogs.userid
    where users.username = 'lisi'
   ```

5. 其他 sql 语句

   ```sql
   -- 执行一次, 更换换模式, 否则删除和修改会报错
   SET SQL_SAFE_UPDATES=0;
   -- 查询mysql版本, 当前版本 >= 5时, VARCHAR(10)时, 不论中文英文都是10个字符
   select version();
   -- 1=1 的用法是在搜索时, 保证哪怕没有其他搜索词, where也不会报错
   select * from blogs where 1=1
   ```

#### 外键

1. 创建外键

   概念: 表和表建立连接

2. 更新限制 & 删除级联

   ```txt
       更新限制: 更新blogs的userid为一个users表中不存在的id, 更新不成功
       删除级联: 删除users中的某个用户, 用户关联的博客也会删除
   ```

3. 连表查询

概念: 两个表数据一起查出来

### sequelize(ORM 工具)

1. 概念: 对象关系映射, 通过操作对象的方式, 操作数据库

   ```txt
     1. 数据表(table), 用js中的模型(class或对象) 代替
     2. 一条/多条数据, 用对象/数组代替
     3. sql语句, 用对象方法代替
   ```

2. 安装: `yarn add mysql2 sequlize`

#### 建模(外键) & 同步到数据库 (ER图)

#### 增删改查 & 连表查询

#### sequelize连接池
