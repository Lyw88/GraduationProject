<script setup lang="ts">
import { DelOrderApi, FindordersApi } from '@/services/order'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

const data = ref()
const store = useUserStore()
const loadData = async () => {
  try {
    const res = await FindordersApi(store.user.u_id)
    data.value = res
  } catch (err) {
    console.log(err)
  }
}

// 删除订单
const delorder = async (o_id: any) => {
  try {
    await DelOrderApi(o_id)
    showToast('删除订单成功!')
    loadData()
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <cpNavbar title="订单详情"></cpNavbar>
  <div class="AllOrder-page">
    <template v-if="data?.length != 0">
      <div class="panel" v-for="item in data" :key="item.o_id">
        <div class="title">
          <div class="order_id">订单号：{{ item.o_id }}</div>
          <div class="date">{{ item.o_time }}</div>
        </div>
        <div class="content">
          <van-card
            v-for="product in item.o_content"
            :key="product.p_id"
            :num="product.quantity"
            :price="product.p_price.toFixed(2)"
            :title="product.p_name"
            :thumb="
              product.p_image
                ? 'http://localhost:3000/upload/' + `${product?.p_image}`
                : `https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg`
            "
          />
          <div class="btn">
            <div class="state">
              状态:{{ item?.o_state === 1 ? '完成' : '待支付' }}
            </div>
            <van-button
              type="success"
              round
              size="small"
              @click="delorder(item?.o_id)"
              >删除订单</van-button
            >
            <van-button type="success" round size="small">查看订单</van-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.AllOrder-page {
  padding-top: 46px;
  .panel {
    margin: 15px;
    background-color: #fff;
    border-radius: 8px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 31px;
      border-bottom: 1px solid #e9ecf0;
      padding: 0 15px;
    }
    .content {
      background-color: #fff;
      border-radius: 0 0 8px 8px;
      .van-card {
        background-color: #fff;
        border-radius: 8px;
      }
      .btn {
        height: 31px;
        padding: 5px 15px;
        border-top: 1px solid #e9ecf0;
        overflow: hidden;
        .state {
          display: inline-block;
          line-height: 31px;
        }
        .van-button {
          float: right;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
