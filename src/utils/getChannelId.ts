/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 19:23:27
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-02 19:27:38
 * @FilePath: /management-terminal/src/utils/getChannelId.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Utils from "./index";

export const getChannelId = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = Utils.getStorage("auth") as any;
  if (result) {
    return JSON.parse(result)['channelId'];
  } else {
    return "";
  }
};
