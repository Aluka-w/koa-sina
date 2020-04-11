const { Blog, User } = require('./model')
!(async function () {
  // 创建用户
  // 类比: inset into users () values ()
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
  })
  // dataValues 获取插入之后数据信息
  // console.log('zhangsan', zhangsan.dataValues)
  const zhangsanId = zhangsan.dataValues.id
  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四',
  })
  const lisiId = lisi.dataValues.id
  // 创建博客
  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsanId,
  })

  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: lisiId,
  })
})()
