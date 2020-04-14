/**
 * @description sequelize 实例
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../util/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql', // 声明数据库类型
}

// 但愿测试的时候, 不打印sequelize语句
if (isTest) {
  conf.logging = () => {}
}

// 连接池配置, 线上环境, 比较稳定
if (isProd) {
  conf.poor = {
    max: 5, // 连接池可连接的最大数量
    min: 0,
    idle: 1000, // 如果一个连接池 10s之内没有被使用, 就被释放
  }
}
// 数据库名, 账户, 密码
const seq = new Sequelize(database, user, password, conf)

module.exports = seq
