/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-03-31 16:32:21
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-02 15:25:33
 * @FilePath: /data-management-terminal/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class Utils {
  getStorage(key: string) {
    const result = localStorage.getItem(key)
    return result
  }
  setStorage(key: string, data: any) {
    localStorage.setItem(key, data)
  }
  deleteStorage(key: string) {
    localStorage.removeItem(key)
  }
}


export default new Utils()