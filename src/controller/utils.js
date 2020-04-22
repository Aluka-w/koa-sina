/**
 * @description utils controller
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 图片最大1M
const MAX_SIZE = 1024 * 1024 * 1024
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    // 不存在就创建
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 
 * @param {string} name 文件名
 * @param {string} size 文件大小
 * @param {string} type 文件类型
 * @param {string} filePath 文件地址
 */
async function saveFile({ name, size, type, filePath }) {
  // 图片过大则删除
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件

  const fileName = `${Date.now()}.${name}` // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  console.log(123, distFilePath);
  await fse.move(filePath, distFilePath)
  // 返回信息, app.js配置了根目录的资源
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}