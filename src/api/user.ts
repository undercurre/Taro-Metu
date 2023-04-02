import env_config from './base';
import { post, get } from '../utils/request';
import Taro from '@tarojs/taro';

const moduleUrl = env_config.base_url + 'backend/user/';

export async function Register(
    username: string,
    password: string,
    email: string,
    phone: string,
) {
    const res = await post<{ id: number }>(moduleUrl + 'register', {
        username: username,
        password: password,
        email: email,
        phone: phone,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}

export async function Login(username: string, password: string) {
    const res = await get<{ token: string; info: { [key: string]: any } }>(
			env_config.base_url + 'backend/' + 'login',
        {
            username: username,
            password: password,
        },
    );

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var loginRes = Object.assign({}, mark, res[1]);

    return loginRes;
}

export async function wechatLogin() {
  const loginCode = await Taro.login();

  const res = await get<{ token: string; info: { [key: string]: any } }>(
    env_config.base_url + 'backend/' + 'wechatLogin',
      {
          code: loginCode.code,
      },
  );

  const mark = {
      isSuccess: res[1] && res[1].code === 0,
  };

  var loginRes = Object.assign({}, mark, res[1]);

  return loginRes;
}

export async function GetInfo(id: number) {
    const res = await get<{
        username: string;
        email: string;
        phone: string;
        roleId: string;
    }>(moduleUrl + 'getInfo', {
        userId: id,
    });

    const mark = {
        isSuccess: res[1] && res[1].code === 0,
    };

    var lastRes = Object.assign({}, mark, res[1]);

    return lastRes;
}
