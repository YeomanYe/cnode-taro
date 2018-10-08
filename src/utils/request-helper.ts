import Taro from '@tarojs/taro';
import {baseUrl, noConsole} from '../config';

enum ReqType{
  GET = 'GET',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
  PUT = 'PUT',
  DELETE = 'DELETE',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT'
}

interface ReqOption {
  data: any,
  url?: string,
  method: ReqType,
  header:any
}

export function httpReq(options: ReqOption = {method: ReqType.GET, data: {},header:{}}) {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: options.header,
    method: options.method,
  }).then((res) => {
    console.log('res',res);
    const {statusCode, data} = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, data);
      }
      if (data.success !== true) {
        Taro.showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}

export async function formGet(url:string,data?:any,header:any = {}) {
  header['Content-Type'] = 'application/x-www-form-urlencoded';
  return await httpReq({method:ReqType.GET,url,data,header})
}

export function reqIsSuccess(data:any) {
    let flag = true;
    if(data.success !== true) flag = false;
    return flag;
}
