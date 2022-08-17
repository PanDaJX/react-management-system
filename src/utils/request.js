/*
 * @author: 林俊贤
 * @Date: 2022-07-25 15:19:30
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-08-11 16:37:57
 * @Description: 请求拦截器
 */
import axios from "axios";
axios.defaults.timeout = 3000;
axios.defaults.baseURL = "/api";
