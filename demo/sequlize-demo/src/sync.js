const seq = require('./seq')
// const Sequelize = require('sequelize')

// 同步

require('./model')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功');
}).catch(err =>{
  console.log('连接失败');
})

// 执行同步
// 强制覆盖原有同名的表
seq.sync({ force: true }).then(() => {
  console.log('ok')
  process.exit()
})