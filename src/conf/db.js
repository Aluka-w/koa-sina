/**
 * @description conf文件
 * @author wangbin
 */
const { isProd } = require('../util/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
}

module.exports = {
  REDIS_CONF,
}
