/**
 * @description 微博格式校验
 */
const { Blog } = require('../../src/db/modal/index')

test('校验微博数据, 应该成功', () => {
  const result = Blog.build({
    userId: 1,
    content: '测试存储',
    image: 'test.png'
  })
  expect(result.userId).toBe(1)
  expect(result.content).toBe('测试存储')
  expect(result.image).toBe('test.png')
})