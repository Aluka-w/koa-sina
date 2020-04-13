/**
 * @description 环境变量
 * @author wangbin
 */

 const ENV = process.env.NODE_ENV

 module.exports = {
   isDev = ENV === 'dev',
   noDev = ENV !== 'dev',
   isProd = ENV === 'production',
   noProd = ENV !== 'production',
 }