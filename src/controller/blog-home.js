/**
 * @description 首页 controller
 */

const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const xss = require('xss')

async function create({ content, image, userId }) {
  try {
    const result = await createBlog({ content: xss(content), image, userId })
    return new SuccessModel(result)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create,
}
