import { LoadShopCarApi, product_itemApi } from '@/services/product'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '..'

export const useShopCarStore = defineStore(
  'shopcar-store',
  () => {
    const goodslist = ref<[] | undefined>([]) //购物车数据
    const selectedItems = ref([])

    //获取商品列表
    const getgoodslist = (data: []) => {
      data.forEach((item: any) => {
        item.checked = false
      })
      goodslist.value = data
    }

    // 清空商品列表
    const delgoodlist = () => {
      goodslist.value = undefined
    }

    // 更新数据
    const data = ref()
    const store = useUserStore()
    const LoadData = async () => {
      try {
        const res = await LoadShopCarApi(store.user?.u_id)
        data.value = res
        await getgoodslist(data.value)
        console.log(data.value)

        return
      } catch (err) {
        console.log(err)
      }
    }

    //订单栏总计
    const totalPrice = computed(() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      selectedItems.value = [] // 清空selectedItems
      if (!goodslist.value || !Array.isArray(goodslist.value)) {
        return 0
      }

      const total = goodslist.value.reduce((sum, item) => {
        if (item && item.checked && item.quantity && item.p_price) {
          // @ts-ignore
          selectedItems.value.push(item)
          sum += item.quantity * item.p_price // 计算总价
        }
        return sum
      }, 0)
      return total * 100
    })

    return {
      // 属性
      goodslist,
      selectedItems,
      // 方法
      getgoodslist,
      delgoodlist,
      LoadData,
      totalPrice
    }
  },
  {
    persist: true
  }
)
