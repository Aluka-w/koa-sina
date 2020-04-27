/**
 * @description blog相关的缓存(广场页需要缓存)层
 */
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * 获取广场列表缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  }
  // 获取缓存失败, 重新获取
  const result = await getBlogListByUser({ pageIndex, pageSize })
  // 设置缓存, 缓存60s
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList,
}
