/**
 * @description user api test
 */
const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}

// 存储 cookie
let COOKIE = ''

// 注册用户
test('注册用户, 应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册 应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 用户是否存在
test('查询注册名是否存在, 应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测, 非法格式, 注册应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123',
    password: '123',
    // nickName: userName,
    gender: 'mai',
  })
  expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录, 应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password,
  })
  expect(res.body.errno).toBe(0)
  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// // 删除
// test('删除用户，应该成功', async () => {
//   const res = await server
//     .post('/api/user/delete')
//     .set('cookie', COOKIE)
//   expect(res.body.errno).toBe(0)
// })
