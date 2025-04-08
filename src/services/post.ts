/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:21:02
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 11:06:10
 * @FilePath: /management-terminal/src/services/post.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const doPostRequest = async (optoins: { url: string; data: any }) => {
  const { url, data } = optoins
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
        throw err
      })
  })
}
