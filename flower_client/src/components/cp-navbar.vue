<script setup lang="ts">
import router from '@/router'

const props = defineProps<{
  title: string
  rightText?: string
  back?: () => void
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()

const onClickLeft = () => {
  //判断有无back
  if (props.back) {
    return props.back()
  }
  //点击左侧返回按钮
  if (history.state.back) {
    router.back()
  } else {
    console.log(history)

    router.push('/')
  }
}
const onClickRight = () => {
  // 点击右侧文字按钮
  emit('click-right')
}
</script>
<template>
  <div class="navbar-page">
    <van-nav-bar
      fixed
      :title="title"
      left-arrow
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
