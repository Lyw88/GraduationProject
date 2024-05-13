import { useShopCarStore } from './shopcar'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { orderUseStore } from './order'
import { getuserinfoApi } from '@/services/user'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    const user = ref()
    const user_info = ref()
    const car_store = useShopCarStore()
    const order_store = orderUseStore()

    const getUser = (u: any) => {
      user.value = u
    }

    const getuserinfo = (data: any) => {
      user_info.value = data
    }

    //渲染个人信息
    const loadData = async () => {
      try {
        const res = await getuserinfoApi(user.value?.u_phone || 0)
        user_info.value = res.data
      } catch (err) {
        console.log(err)
      }
    }

    const delUser = () => {
      user.value = undefined
      car_store.delgoodlist()
      order_store.delval()
      user_info.value = undefined
    }

    return {
      user,
      user_info,
      getuserinfo,
      getUser,
      delUser,
      loadData
    }
  },
  {
    persist: true
  }
)
