/**
 * @description blog service
 */
const { Blog, User } = require('../db/modal/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博
 * @param {string} content 微博内容
 * @param {string} image 微博图片
 * @param {number} userId 用户id
 */
async function createBlog({ content, image, userId }) {
  const result = await Blog.create({
    content,
    image,
    userId,
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Objet} param0 { userName, pageIndex = 0, pageSize = 10}查询条件
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 查询条件
  const whereOpts = {}
  if (userName) {
    whereOpts.userName = userName
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: whereOpts,
      },
    ],
  })

  // result.count // 总数, 跟分页无关
  // result.rows // 查询结果, 数组

  let blogList = result.rows.map((row) => row.dataValues)
  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })
  return {
    count: result.count,
    blogList,
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
}
