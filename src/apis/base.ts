/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-03-31 16:35:09
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 11:39:32
 * @FilePath: /data-management-terminal/src/apis/base.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { baseURL, doPostRequest, doGetRequest } from "../services/index";

export const postLogin = (data: { userName: string; password: string }) => {
  return doPostRequest({
    url: baseURL + "/channel/login",
    data: data,
  });
};

export const getCorpList = (channelId: string) => {
  return doGetRequest({
    url: baseURL + `/channel/corpList?channelId=${channelId}`,
  });
};

// 渠道数据看板明细
export const getChannelDataBoard = (data: {
  channelId: string;
  date?: string;
  corpId?: string
  pageNum: number;
  pageSize: number;
}) => {
  return doPostRequest({
    url: baseURL + `/channel/data/board`,
    data,
  });
};

export const getChannelDataBoardCount = (data: {
  channelId: string;
  corpId?: string;
  date?: string
  pageNum: number;
  pageSize: number;
}) => {
  return doPostRequest({
    url: baseURL + `/channel/data/board/count`,
    data,
  });
};

// 渠道订单明细
export const getChannelOrder = (data: {
  channelId: string;
  date: string;
  corpId: string
  pageNum: number;
  pageSize: number;
  orderType: string
}) => {
  return doPostRequest({
    url: baseURL + `/channel/order`,
    data,
  });
};

// 渠道订单合计
export const getChannelOrderCount = (data: {
  channelId: string;
  date: string;
  corpId: string;
  pageNum: number;
  pageSize: number;
}) => {
  return doPostRequest({
    url: baseURL + `/channel/order/count`,
    data,
  });
};
