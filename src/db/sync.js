/**
 * @description sequelize 同步数据库
 */
const seq = require('./seq')

// 同步
require('./modal')

// 测试连接
seq.authenticate().then(() => {
  console.log('sequelize连接成功');
}).catch(err =>{
  console.log('sequelize连接失败');
})

// 执行同步
// 强制覆盖原有同名的表
seq.sync({ force: true }).then(() => {
  process.exit()
})