/**
 * @description test demo
 */
const sum = (a, b) => {
  return a + b
}

test("10 + 20 等于 30", () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})
