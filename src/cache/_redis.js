/**
 * @description redis配置文件
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err) => {
  console.log('redis err')
})

/**
 * redis-get
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeOut 过期时间
 */
const set = (key, val, timeOut = 60 * 60) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.setrange(timeOut)
}

/**
 * redis-get
 * @param {*} key 键
 */
const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (val == null) {
        resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get,
}
