const Sequelize = require('sequelize')
const conf = {
  host: 'localhost',
  dialect: 'mysql',
}
// 连接池配置, 线上环境, 比较稳定
// conf.poor = {
//   max: 5, // 连接池可连接的最大数量
//   min: 0, 
//   idle: 1000 // 如果一个连接池 10s之内没有被使用, 就被释放
// }

const seq = new Sequelize('sina', 'root', 'het@123', conf);

module.exports = seq

// 测试连接
// seq.authenticate().then(() => {
//   console.log('连接成功');
// }).catch(err =>{
//   console.log('连接失败');
// })