<template>
    <nut-cell size="large" class="h-8vh bg-#fff798 rounded-16px">
        <template v-slot:title>
            <view class="flex justify-between items-center h-full">
                <text class="w-23vw h-48px leading-normal text-#000 text-32px truncate">{{ props.mission.name }}</text>
                <nut-countdown class="flex-1 truncate leading-normal text-28px" :endTime="computed(props.mission.dealline)" format="DD 天 HH 时 mm 分 ss 秒" />
                <nut-button class="w-20vw h-4vh text-28px" size="normal" color="#fd7e89" type="success" @tap="complete" :disabled="props.mission.status === '1'">完成</nut-button>
            </view>
        </template>
    </nut-cell>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { UpdateMission } from '../api/mission';

const props = defineProps({
    mission: {
      type: Object as PropType<Mission>,
      default: {}
    }
});

const emits = defineEmits(['updatedMission']);

function computed(end: string) {
  const res = Date.parse(end)
  return res
}

async function complete() {
  if (props.mission.status === '1') return;
  await UpdateMission(props.mission.id, props.mission.name, props.mission.dealline, 1);
  emits('updatedMission');
}
</script>
