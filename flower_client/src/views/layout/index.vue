<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar route :border="false">
      <van-tabbar-item to="/home">
        首页
        <template #icon="prob">
          <cp-icon :name="`home-home-${prob.active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/sort">
        分类
        <template #icon="{ active }">
          <cp-icon :name="`home-sort-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/find">
        发现
        <template #icon="{ active }">
          <cp-icon :name="`home-find-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item> -->
      <van-tabbar-item to="/shopcar">
        购物车
        <template #icon="{ active }">
          <cp-icon :name="`home-car-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
        <template #icon="{ active }">
          <cp-icon :name="`home-user-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  :deep() {
    .van-tabbar {
      background-color: #f7f9fa;
      height: 55px;
    }
    .van-tabbar-item {
      &__icon {
        font-size: 24px;
      }
      &__text {
        font-size: 12px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
    .van-tabbar-item--active {
      background-color: #f7f9fa;
      color: #44de7b;
    }
  }
}
</style>
