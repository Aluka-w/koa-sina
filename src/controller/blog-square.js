/**
 * @description square controller
 */
const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 根据页码获取广场微博数据
 * @param {number} pageIndex 页码
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  })
}

module.exports = {
  getSquareBlogList,
}
