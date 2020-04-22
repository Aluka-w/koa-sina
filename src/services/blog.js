/**
 * @description blog service
 */
const { Blog } = require('../db/modal/index')

async function createBlog({ content, image, userId }) {
  const result = await Blog.create({
    content,
    image,
    userId,
  })
  return result.dataValues
}

module.exports = {
  createBlog,
}
