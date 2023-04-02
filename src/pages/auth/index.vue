<template>
  <view class="flex flex-col items-center justify-center h-screen">
    <view class="text-3xl font-bold mb-5">请授权登录</view>
    <view class="text-sm text-gray-600 mb-10">为了更好地使用本小程序，请您允许获取微信账号信息</view>
    <button class="w-63vw h-10vh rounded-full bg-green-500 text-white font-bold text-md flex items-center justify-center"
      @tap="check">允许授权</button>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro';

useLoad(async () => {
})

async function check() {
  const res = await Taro.login()
  console.log(res)
}
</script>
