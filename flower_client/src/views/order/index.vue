<script setup lang="ts">
import router from '@/router'
import { OrderSubmitApi } from '@/services/order'
import { DelProductApi } from '@/services/product'
import { addressInfoApi } from '@/services/user'
import { useUserStore } from '@/stores'
import { orderUseStore } from '@/stores/modules/order'
import { useShopCarStore } from '@/stores/modules/shopcar'
import { mobileRules } from '@/utils/rules'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { onMounted, ref } from 'vue'

const car_store = useShopCarStore()
const stores = useUserStore()
const order_store = orderUseStore()

// 渲染默认地址
const load_addres = async () => {
  if (order_store.address != undefined) return
  const res = await addressInfoApi(stores.user?.u_id)
  // @ts-ignore
  for (const item of res.data) {
    if (item.isDefault === 1) {
      order_store.getaddress(item)
    }
  }
}

//日期
const showBottom = ref(false)
const currentTime = ref(['12', '00'])
const selectTime = () => {
  order_store.gettime(currentTime.value.join(':'))
  showBottom.value = false
}

//订购人信息
const showRight = ref(false)
const orderer_name = ref()
const orderer_phone = ref()
const onSubmit = () => {
  showRight.value = false
}

//备注
const notes = ref()

//提交订单
const OnClickSubmit = () => {
  if (order_store.address != undefined && orderer_name.value != undefined) {
    const currentDate = new Date(Date.now())
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 添加前导零
    const day = String(currentDate.getDate()).padStart(2, '0') // 添加前导零
    const formattedDate = `${year}/${month}/${day}`

    showConfirmDialog({
      message: '已成功支付?'
    })
      .then(async () => {
        try {
          const o_content = JSON.stringify(car_store.selectedItems)
          const res = await OrderSubmitApi({
            u_id: stores.user?.u_id,
            a_id: order_store.address.id,
            o_total: car_store.totalPrice / 100,
            o_time: formattedDate,
            o_state: true,
            o_content,
            orderer: orderer_name.value + ',' + orderer_phone.value,
            notes: notes.value
          })
          showSuccessToast(res.message)
          await car_store.selectedItems.forEach(async (item) => {
            await DelProductApi({ u_id: item.u_id, p_id: item.p_id })
          })
          await car_store.LoadData()
          router.push('/shopcar')
        } catch (err) {
          console.log(err)
        }
      })
      .catch(() => {
        // on cancel
      })
  } else {
    showToast('请检查 收货人&&订购人  信息是否正确填写')
  }
}

onMounted(() => {
  load_addres()
})
</script>

<template>
  <div class="order-page">
    <cpNavbar title="提交订单" />
    <!-- 配送信息 -->
    <van-cell-group inset class="receiver">
      <van-cell
        title="收货人"
        is-link
        v-if="order_store?.address != undefined"
        @click="$router.push({ path: '/user/address' })"
      >
        <template #value>
          <div class="info">
            <span class="name">{{ order_store?.address?.name }}</span>
            <span class="phone">{{ order_store?.address?.tel }}</span>
          </div>
          <div class="detail-info">
            {{
              order_store?.address?.city +
              order_store?.address?.county +
              order_store?.address?.addressDetail
            }}
          </div>
        </template>
      </van-cell>
      <van-cell
        title="收货人"
        is-link
        value="请完善收货人信息"
        v-if="order_store.address === undefined"
        @click="$router.push({ path: '/user/address' })"
      />
      <van-cell
        title="送达时间"
        is-link
        :value="order_store.time"
        @click="showBottom = true"
      />
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-time-picker
          v-model="currentTime"
          title="选择时间"
          @cancel="showBottom = false"
          @confirm="selectTime"
        />
      </van-popup>
    </van-cell-group>
    <!-- 订购人信息 -->
    <van-cell-group
      inset
      class="orderer"
      v-if="orderer_name === undefined && orderer_phone === undefined"
      @click="showRight = true"
    >
      <van-cell title="订购人信息" is-link value="请填写" />
    </van-cell-group>

    <van-cell-group inset class="orderer" v-else>
      <van-cell
        title="订购人信息"
        is-link
        value="请填写"
        @click="showRight = true"
      >
        <template #value>
          <div class="orderer_info">
            <span>{{ orderer_name }}</span>
            <span>{{ orderer_phone }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup
      class="order-popup"
      v-model:show="showRight"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <cpNavbar title="订购人信息" :back="() => (showRight = false)"></cpNavbar>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="orderer_name"
            name="订购人姓名"
            label="订购人姓名"
            placeholder="请输入订购人姓名"
            :rules="[{ required: true, message: '请输入订购人姓名' }]"
          />
          <van-field
            v-model="orderer_phone"
            name="手机号"
            label="手机号"
            placeholder="请输入订购人手机号"
            :rules="mobileRules"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <!-- 商品信息 -->
    <van-cell-group inset class="product-info">
      <van-card
        v-for="item in car_store.selectedItems"
        :key="item"
        :num="item?.quantity"
        :price="item?.p_price"
        desc="描述信息"
        :title="item?.p_name"
        :thumb="
          item?.p_image != null
            ? 'http://localhost:3000/upload/' + `${item?.p_image}`
            : 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
        "
      />
      <div class="think"></div>
      <van-cell
        title="已优惠: 0"
        :value="`小计：` + `${car_store.totalPrice / 100}`"
      />
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group inset class="notes">
      <van-field
        v-model="notes"
        name="用户名"
        label="备注："
        placeholder="选填"
      />
    </van-cell-group>
    <van-submit-bar
      :price="car_store.totalPrice"
      button-text="提交订单"
      @submit="OnClickSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.order-page {
  padding-top: 55px;
  .van-cell-group {
    margin-bottom: 12px;
  }
  .receiver {
    background-color: #fff;
    :deep().van-cell {
      display: flex;
      align-items: center;
      .van-cell__title {
        flex: 0.35;
      }
      .van-cell__value {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        text-align: left;
      }
      &:nth-child(2) {
        .van-cell__value {
          color: #232628;
          text-align: left !important;
        }
      }
      .info {
        span {
          color: #232628;
          font-size: 14px;
          font-weight: 700;
          padding-right: 12px;
        }
      }
      .detail-info {
        font-size: 12px;
        color: #232628;
      }
    }
  }
  .orderer {
    :deep().van-cell__value {
      color: #232628;
      text-align: right !important;
      .orderer_info {
        span {
          padding-left: 10px;
          font-weight: 700;
        }
      }
    }
  }
  .product-info {
    .van-card {
      background-color: #fff;
    }
    .think {
      height: 1px;
      transform: scaleY(0.05);
      background-color: #000;
      transform-origin: 0 0;
      margin: 0;
    }
    :deep().van-cell__value {
      font-size: 13px;
    }
  }
  :deep().notes {
    .van-field {
      .van-cell__title {
        flex: unset;
      }
      .van-cell__value {
        text-align: left;
      }
    }
    margin-bottom: 60px;
    &::after {
      content: '';
      display: block;
    }
  }
  .van-submit-bar {
    bottom: 0;
  }
  .order-popup {
    padding-top: 55px;
    background-color: #f3f5f7;
  }
}
:deep().van-dialog {
  width: 500px !important;
}
</style>
