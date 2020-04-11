const { Blog, User } = require('./model')
!(async function () {
  // 查询用户
  // 查询一条数据
  // const zhangsan = await User.findOne({
  //   where: {
  //     userName: 'zhangsan',
  //   },
  // })
  // console.log('zhangsan', zhangsan.dataValues)

  // 查询特定的列
  // 类比 SELECT `username`, `nickName` FROM `users` AS `user` WHERE `user`.`userName` = 'zhangsan' LIMIT 1;
  // const zhangsanName = await User.findOne({
  //   attributes: ['username', 'nickName'],
  //   where: {
  //     userName: 'zhangsan'
  //   }
  // })
  // console.log('zhangsanName', zhangsanName.dataValues)

  // 查询列表
  // const zhangsanBlogList = await Blog.findAll({
  //   where: {
  //     userId: 2,
  //   },
  //   order: [['id', 'desc']],
  // })
  // console.log(
  //   'zhangsanBlogList',
  //   zhangsanBlogList.map((blog) => blog.dataValues)
  // )

  // 分页
  // const blogPageList = await Blog.findAll({
  //   limit: 1, // 限制本次查询 1条
  //   offset: 1, // 本次跳过0条
  //   order: [['id', 'desc']], // 排序
  // })
  // console.log(
  //   'blogPageList',
  //   blogPageList.map((blog) => blog.dataValues)
  // )

  // 查询总数
  // const blogListAndCount = await Blog.findAndCountAll({
  //   limit: 1, // 限制本次查询 1条
  //   offset: 0, // 本次跳过0条
  //   order: [['id', 'desc']], // 排序
  // })
  // console.log(
  //   'blogListAndCount',
  //   blogListAndCount.count, // 总数, 不考虑分页
  //   // 查询出来的页面
  //   blogListAndCount.rows.map((blog) => blog.dataValues)
  // )

  // 连表查询1, 基于Blog.belongsTo(User)才可以
  // 查询blog顺便带上user
  // const blogListWithUser = await Blog.findAndCountAll({
  //   order: [['id', 'desc']],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['userName', 'nickName'],
  //       where: {
  //         userName: 'zhangsan',
  //       },
  //     },
  //   ],
  // })
  // console.log('blogListWithUser',
  //   blogListWithUser.count, // 总数, 不考虑分页
  //   // 查询所有数据
  //   blogListWithUser.rows.map((blog) => {
  //     const blogVal = blog.dataValues
  //     // 这里也把user的数据也带上了, 所有不能直接返回
  //     blogVal.user = blogVal.user.dataValues
  //     return blogVal
  //   })
  // )

  // 连表查询2, 基于User.hasMany(Blog)
  // 查询users, 把存在的blog顺便带出来
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog,
      },
    ],
  })
  console.log(
    'userListWithBlog',
    userListWithBlog.count, // 总数, 不考虑分页
    // 查询所有数据
    userListWithBlog.rows.map((user) => {
      const userVal = user.dataValues
      userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
      return userVal
    })
  )
})()
