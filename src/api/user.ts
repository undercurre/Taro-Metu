import { post } from "../utils/request/index";
import base from "./base";

export async function login2Server(code: string) {
  const url = base.base_url + 'wechat/auth'
  const res = await post(url, {
    code: code
  })
  console.log(res)
  return res
}
