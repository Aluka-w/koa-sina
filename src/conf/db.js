/**
 * @description conf文件
 * @author wangbin
 */
const { isProd } = require('../util/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'het@123',
  // password: '722.616.623wang',
  port: '3306',
  database: 'sina',
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'het@123',
    // password: '722.616.623wang',
    port: '3306',
    database: 'sina',
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
