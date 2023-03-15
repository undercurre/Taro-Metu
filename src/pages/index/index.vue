<template>
  <view class="min-w-screen min-h-screen bg-#89aa97 px-30px py-30px box-border">
    <MissionItem class="mb-20px" v-for="item in missionList" :mission="item" :key="item.id" @updatedMission="getMission"></MissionItem>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { useReady } from '@tarojs/taro';
import { QueryMission } from '../../api/mission';
import { Ref } from 'vue';
import { Login } from '../../api/user';
import MissionItem from '../../components/MissionItem.vue'

const missionList: Ref<Array<Mission>> = ref([])
let userId: number = 0;

useReady(async () => {
  const user_info = await Login('lirh42', '123456');
  Taro.setStorage({
    data: user_info.data.token,
    key: 'token'
  });
  userId = user_info.data.info["userId"];
  getMission();
})

async function getMission() {
  const res = await QueryMission(userId);
  missionList.value = res.data.list?.filter(item => item.status !== '1').reverse() || [];
}
</script>
