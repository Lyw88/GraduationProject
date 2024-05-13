<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import { orderUseStore } from '@/stores/modules/order'
import { onMounted } from 'vue'
import { ref } from 'vue'

const store = useUserStore()
const order_store = orderUseStore()

// 退出登录
const logout = () => {
  store.delUser()
  router.push('/login')
}

//遮罩层
const showRight = ref(false)
const showPopup = () => {
  showRight.value = true
}

const showRightchange = (newval: boolean) => {
  showRight.value = newval
}

onMounted(async () => {
  await store.loadData()
  await order_store.o_stateCount()
})
</script>

<template>
  <div class="user-page">
    <div class="user-page-head" @click="showPopup">
      <!-- 头部-头像 -->
      <div class="top">
        <van-image
          round
          fit="cover"
          position="center"
          :src="
            store.user_info?.u_avatar != null
              ? 'data:image/png;base64,' + store.user_info?.u_avatar
              : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
          "
        />
        <div class="name">
          <p>{{ store.user_info?.u_name || '用户907456' }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="panel">
      <div class="head">
        <h3>我的订单</h3>
        <p @click="$router.push('/allorder')">
          全部订单<van-icon name="arrow" />
        </p>
      </div>
      <div class="body">
        <van-row justify="center" align="center">
          <van-col span="8">
            <!-- <van-badge :content="order_store?.state_count[0]?.count || ''">
            </van-badge> -->
            <cp-icon name="user-待付款" />

            <p>待付款</p>
          </van-col>
          <van-col span="8">
            <!-- <van-badge :content="order_store?.state_count[1]?.count || ''">
            </van-badge> -->
            <cp-icon name="user-进行中" />

            <p>进行中</p>
          </van-col>
          <van-col span="8">
            <cp-icon name="user-评价" />
            <p>评价</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 个人信息栏 -->
    <div class="user-info">
      <van-row>
        <van-col span="8">
          <p>{{ store.user_info?.u_integral || 0 }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="8">
          <p>{{ store.user_info?.u_coupon || 0 }}</p>
          <p>优惠券</p>
        </van-col>
        <van-col span="8">
          <p>{{ store.user_info?.u_collect || 0 }}</p>
          <p>收藏</p>
        </van-col>
      </van-row>
    </div>
    <!-- 快捷工具 -->
    <div class="user-tool">
      <van-cell-group title="快捷工具" :inset="true">
        <van-cell title="地址管理" is-link :border="false" to="/user/address">
          <template #icon>
            <cp-icon :name="`user-地址`"></cp-icon>
          </template>
        </van-cell>
        <van-cell title="官方客服" is-link :border="false">
          <template #icon>
            <cp-icon :name="`user-客服`"></cp-icon>
          </template>
        </van-cell>
        <van-cell title="设置" is-link :border="false">
          <template #icon>
            <cp-icon :name="`user-设置`"></cp-icon>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 退出登录 -->
    <a href="javascript:;" class="logout" @click="logout()">退出登录</a>
    <!-- 遮罩层 -->
    <van-popup
      v-model:show="showRight"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <userEditPage @valueChanged="showRightchange"></userEditPage>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  padding: 20px 15px 60px;
  background-image: url('@/assets/user/label-grade-1-new.png');
  background-repeat: no-repeat;
  background-size: contain;
  &-head {
    position: relative;
    height: 112px;
    .top {
      display: flex;
      align-items: center;
      padding-left: 15px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);

      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding: 0 15px;
      }
    }
  }
  .panel {
    background-color: #fff;
    border-radius: 8px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e9ecf0;
      h3 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
        color: #232628b3;
      }
    }
    .body {
      .van-col {
        text-align: center;
        padding: 8px 0;
        .cp-icon {
          font-size: 28px;
        }
      }
    }
  }
  .user-info {
    margin-top: 12px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 0;
    .van-col {
      text-align: center;
      padding: 8px 0;
      p:first-child {
        font-size: 17.5px;
        font-weight: 700;
      }
      p:last-child {
        margin-top: 6px;
        font-size: 13.44px;
      }
    }
  }
  .user-tool {
    margin-top: 12px;
    background-color: #fff;
    border-radius: 8px;
    padding-bottom: 12px;
    :deep().van-cell-group__title {
      font-size: 16px;
      font-weight: 700;
      color: black;
    }
    .van-cell__title {
      font-size: 14px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 5px;
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    color: #eb5757;
    text-align: center;
  }
  .van-popup {
    .van-form {
      padding-top: 56px;
    }
  }
}
</style>
