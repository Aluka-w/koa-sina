const Sequelize = require('sequelize')
const seq = require('./seq')

// 模型就是建表

// 创建 User 模型(相当于mysql手动建表)
// 表名会自动返回 users
const User = seq.define('user', {
  // id 自动创建, 自增, 自动设置为主键
  userName: {
    type: Sequelize.STRING, // 对应sql的varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    allowNull: false,
    common: '昵称'
  }
  // 自动创建 createAt
  // 自动创建 updateAt
})

// 创建 Blog 模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '标题'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

// 外键关联
// 多对一, 默认就会关联User的id
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})
// 这种语法, 也会隐形的创建userId, 并且关联
// Blog.belongsTo(User)

// 与上一致
User.hasMany(Blog, {
  foreignKey: 'userId'
})

// 两种方法都是外键关联, 可同时存在, 区别在于
// Blog.belongsTo(User), 查询Blog会自动带出User信息
// User.hasMany(Blog), 查询User会自动带出Blog信息



module.exports = {
  User,
  Blog
}