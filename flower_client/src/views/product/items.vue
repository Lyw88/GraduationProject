<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { product_itemApi, AddShopCarApi } from '@/services/product'
import { useUserStore } from '@/stores'
import { useShopCarStore } from '@/stores/modules/shopcar'
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const car_store = useShopCarStore()
const route = useRoute()

//调用接口
const info = ref()
const load = async () => {
  const res = await product_itemApi(route.query.p_id)
  info.value = res
  console.log(info.value)
}

//加入购物车
const store = useUserStore()
const addshopcar = async () => {
  try {
    const res = await AddShopCarApi({
      u_id: store.user?.u_id,
      p_id: info.value.p_id,
      quantity: 1
    })
    await car_store.LoadData()
    showToast(res.message)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await load()
})
</script>

<template>
  <cpNavbar
    title="商品详情"
    right-text="主页"
    @click-right="$router.push('/sort')"
  ></cpNavbar>
  <div class="items-page">
    <!-- 商品信息 -->
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
      <van-swipe-item v-for="item in info?.p_image" :key="item">
        <van-image
          fit="cover"
          :src="'http://localhost:3000/upload/' + `${item}`"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="info">
      <div class="top">
        <div class="price"><span>¥</span>{{ info?.p_price }}</div>
        <div class="sale">已售{{ info?.p_sale }}件</div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="title">{{ info?.p_name }}</div>
          <div class="detail">粉色戴安娜12枝，紫色紫罗兰4枝，粉色洋牡丹3枝</div>
        </div>
        <div class="right"><van-icon name="star-o" />收藏</div>
      </div>
    </div>
    <!-- 配送地址 -->
    <div class="address">
      <van-cell-group>
        <van-cell
          :center="true"
          title="花语"
          :value="info.p_info"
          v-if="info"
        />
        <van-cell title="配送" value="全国" />
      </van-cell-group>
    </div>
    <!-- 加入购物车 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="car_store.goodslist?.length"
        @click="$router.push('/shopcar')"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addshopcar()"
      />
    </van-action-bar>
  </div>
</template>

<style lang="scss" scoped>
:deep().van-nav-bar__text {
  color: black;
}
.items-page {
  padding: 46px 0 50px 0;
  .van-swipe {
    height: 409px;
    .van-swipe-item {
      width: 100%;
    }
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    padding: 12px 16px;
    .top {
      display: flex;
      align-items: center;
      .price {
        flex: 1;
        font-size: 26.6px;
        font-weight: 600;
        color: #ff734c;
        span {
          font-size: 15px;
        }
      }
      .sale {
        font-size: 12px;
        color: #71797f;
      }
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        .title {
          font-size: 16.8px;
          font-weight: bold;
        }
        .detail {
          color: #747474;
          font-size: 14px;
        }
      }
      .right {
        width: 70px;
        height: 25px;
        margin-right: -16px;
        background-color: #eaebef;
        border-radius: 14px 0 0 14px;
        text-align: center;
        line-height: 25px;
        font-size: 14px;
        color: #999b9a;
      }
    }
  }
  :deep().address {
    margin: 11px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .van-cell__title {
      flex: 0.2;
      width: 20px;
      font-size: 12.6px;
      font-weight: bold;
    }
    .van-cell__value {
      text-align: left;
      color: #232628;
    }
  }
}
</style>
