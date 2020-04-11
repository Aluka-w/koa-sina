const { Blog, User } = require('./model')
// 修改
!async function () {
  const updateResult = await User.update(
    {
      nickName: '张三1',
    },
    {
      where: {
        userName: 'zhangsan',
      },
    }
  )
  console.log('updateResult', updateResult[0])
}()
