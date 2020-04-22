/**
 * @description utils api 路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheckx')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if (!file) {
    return
  }
  // path是服务器的临时地址
  const { name, size, type, path } = file
  console.log(456, file)
  ctx.body = await saveFile({ name, size, type, filePath: path })
})

module.exports = router
