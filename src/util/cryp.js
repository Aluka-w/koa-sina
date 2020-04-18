/**
 * @description 加密方法
 * @author Matt
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 密码明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  // 产出一个16进制的经过md5加密的密码
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 密码明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto

