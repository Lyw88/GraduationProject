import { OrderStateCountApi } from '@/services/order'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '..'

export const orderUseStore = defineStore(
  'order-store',
  () => {
    const store = useUserStore()
    const address = ref()
    const time = ref('12:00')

    const getaddress = (data: any) => {
      address.value = data
    }
    const gettime = (data: any) => {
      time.value = data
    }
    const state_count = ref()

    const o_stateCount = async () => {
      try {
        const res = await OrderStateCountApi(store.user.u_id)
        state_count.value = res
      } catch (err) {
        console.log(err)
      }
    }

    const delval = () => {
      address.value = undefined
      time.value = '12:00'
    }
    return {
      address,
      time,
      state_count,
      gettime,
      getaddress,
      delval,
      o_stateCount
    }
  },
  {
    persist: true
  }
)
