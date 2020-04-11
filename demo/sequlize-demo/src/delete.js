const { Blog, User } = require('./model')
// 删除
!async function () {
  // 删除博客
  const delBlogRes = Blog.destroy({
    where: {
      id: 1
    }
  })
  console.log('delBlogRes', delBlogRes)
  // 删除用户的时候, 外键会把相应的博客也删除
  // 出现问题的时候, 记得把mysql中的删除级联勾选一下
}()
