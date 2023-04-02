<template>
  <view class="min-w-screen min-h-screen bg-#89aa97 px-30px py-30px box-border">
    <MissionItem class="mb-20px" v-for="item in missionList" :mission="item" :key="item.id" @updatedMission="getMission">
    </MissionItem>
  </view>
</template>

<script lang="ts" setup>
import { useReady } from '@tarojs/taro';
import { QueryMission } from '../../api/mission';
import { Ref } from 'vue';
import MissionItem from '../../components/MissionItem.vue'
import { userStore } from '../../stores/collection';

const missionList: Ref<Array<Mission>> = ref([]);

useReady(async () => {
    await userStore.checkToken();
    getMission();
})

async function getMission() {
  const res = await QueryMission(userStore.info.userId);
  missionList.value = res.data.list?.filter(item => item.status !== '1').reverse() || [];
}
</script>
