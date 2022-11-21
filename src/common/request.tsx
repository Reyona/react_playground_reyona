import originAxios from 'axios';
import { message } from 'antd';

// 创建自定义实例，指定请求超出时间为20s
const axios = originAxios.create({ timeout: 20000 });

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    /*
      返回数据格式：

      successful response:
      {"flag": 0, "data": ""}

      unsuccessful response:
      {"flag": 1, "msg": "error"}
     */
    if (response.data && response.data.flag === 1) {
      const errorMsg = response.data.msg;
      message.error(errorMsg);
      return Promise.reject(errorMsg);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 对get和post进行封装
export function get<RequestType, ResponseType>(url: string, data: RequestType):Promise<ResponseType> {
  return axios.get(url, { params: data }).then(response => response.data);
}
export function post<RequestType, ResponseType>(url: string, data: RequestType):Promise<ResponseType> {
  return axios.post(url, data).then(response => response.data);
}