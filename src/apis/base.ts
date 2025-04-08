/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-03-31 16:35:09
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 13:55:58
 * @FilePath: /data-management-terminal/src/apis/base.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { baseURL, doPostRequest, doGetRequest } from "../services/index";

export const postLogin = (data: { userName: string; password: string }) => {
  return doPostRequest({
    url: baseURL + "/login",
    data: data,
  });
};

export const postRegister = (data: { userName: string; password: string }) => {
  return doPostRequest({
    url: baseURL + "/register",
    data: data,
  });
};

// 错误信息列表
export const getErrorList = () => {
  return doGetRequest({
    url: baseURL + `/error/list?pageNum=1&pageSize=10`,
  });
};


// 统计信息列表
export const getMsgList = () => {
  return doGetRequest({
    url: baseURL + `/msg/list?pageNum=1&pageSize=10`,
  });
};
