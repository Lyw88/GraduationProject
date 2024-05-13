<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useShopCarStore } from '@/stores/modules/shopcar'
import cpNavbar from '@/components/cp-navbar.vue'
import { DelProductApi } from '@/services/product'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
const car_store = useShopCarStore()
const stores = useUserStore()

//渲染购物车
const data = ref()

//删除商品
const delproduct = async (id: any) => {
  try {
    const res = await DelProductApi({ u_id: stores.user?.u_id, p_id: id })
    await car_store.LoadData()
    data.value = car_store.goodslist
    showToast(res.message)
  } catch (err) {
    console.log(err)
  }
}

//全选功能
const allChecked = ref<boolean | undefined>(false)

const checkAll = () => {
  // @ts-ignore
  car_store?.goodslist?.forEach((item) => (item.checked = allChecked.value))
}

//是否全选计算属性
const isAll = () => {
  const test = computed(
    // @ts-ignore
    () => car_store?.goodslist?.every((item) => item.checked)
  )
  allChecked.value = test.value
}

const onSubmitButtonClick = async () => {
  if (
    car_store.goodslist === undefined ||
    car_store.goodslist?.length === 0 ||
    car_store.selectedItems.length === 0
  ) {
    showToast('购物车为空')
  } else {
    router.push('/order')
  }
}

onMounted(() => {
  isAll()
  data.value = car_store.goodslist
})
</script>

<template>
  <div class="car-page">
    <cp-navbar title="购物车"></cp-navbar>
    <!-- 购物车 -->
    <van-form>
      <div class="car">
        <van-swipe-cell v-for="item in data" :key="item?.p_id">
          <van-card
            :num="item?.quantity"
            :price="item?.p_price"
            desc="描述信息"
            :title="item?.p_name"
            :thumb="
              item?.p_image != null
                ? 'http://localhost:3000/upload/' + `${item?.p_image}`
                : 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
            "
          >
            <template #bottom>
              <div class="count">
                <van-checkbox v-model="item.checked" @change="isAll" />
                <van-stepper v-model="item.quantity" />
              </div>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delproduct(item?.p_id)"
            />
          </template>
        </van-swipe-cell>

        <van-empty
          description="当前购物车为空"
          v-if="
            car_store.goodslist === undefined ||
            car_store.goodslist?.length === 0
          "
        />
        <!-- 订单栏目 -->
        <van-submit-bar
          decimal-length="2"
          :price="car_store.totalPrice"
          :button-text="`去结算(${car_store.selectedItems.length})`"
          @submit="onSubmitButtonClick"
        >
          <van-checkbox v-model="allChecked" @click="checkAll"
            >全选</van-checkbox
          >
        </van-submit-bar>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.car-page {
  padding: 46px 0 115px 0;
  .car {
    margin: 0 15px;
    .van-card {
      margin-top: 10px;
      background-color: #fff;
      border-radius: 16px;
      .count {
        .van-checkbox {
          position: absolute;
          top: 0;
          right: -4px;
        }
        .van-stepper {
          float: right;
          padding-right: 30px;
        }
      }
    }
  }
  .van-submit-bar {
    bottom: 55px;
  }

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
