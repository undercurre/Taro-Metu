import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { wechatLogin } from '../api/user';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            info: {
                email: '',
                phone: '',
                roleIds: '',
                userId: 0,
                username: '未登录',
            },
            token: ''
        };
    },
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
      async checkToken() {
        const token = await Taro.getStorageSync('token');
        const userId = await Taro.getStorageSync('userId');
        if (!token || !userId) {
          const user_info = await wechatLogin();
          Taro.setStorage({
            data: user_info.data.token,
            key: 'token'
          });
          Taro.setStorage({
            data: user_info.data.info["userId"],
            key: 'userId'
          });
          this.token = user_info.data.token
          this.info.userId = user_info.data.info["userId"]
        }
      }
    },
});
