/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-03 13:56:18
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 13:56:28
 * @FilePath: /management-terminal/src/utils/removeEmptyObj.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyValues(obj: { [x: string]: any; }) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] == '') {
      delete obj[key];
    } else if (
      typeof obj[key] === "object" &&
      Object.keys(obj[key]).length === 0
    ) {
      delete obj[key];
    }
  }
  return obj;
}
