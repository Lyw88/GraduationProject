<script setup lang="ts">
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import type { AddressListAddress } from 'vant'
import {
  addressInfoApi,
  editaddressApi,
  addaddressApi,
  deladdressApi,
  toggledefaultApi
} from '@/services/user'
import { ref } from 'vue'
import { showToast } from 'vant'
import type { addressInfo } from '@/types/user'
import { areaList } from '@vant/area-data'
import { orderUseStore } from '@/stores/modules/order'
import router from '@/router'

const store = useUserStore()

const address = ref()

const list = ref()

//渲染地址
const LoadData = async () => {
  const res = await addressInfoApi(store.user?.u_id || 0)
  address.value = res.data
  if (res.code === 500) {
    return (list.value = address.value)
  }
  list.value = address.value.map((item: addressInfo) => {
    return {
      id: item.id,
      name: item.name,
      tel: item.tel,
      address: item.province + item.city + item.county + item.addressDetail,
      isDefault: item.isDefault === 1 ? true : false,
      province: item.province,
      city: item.city,
      county: item.county,
      addressDetail: item.addressDetail
    }
  })
}

const chosenAddressId = ref('1')

//新增地址 弹出层
const onAdd = () => {
  showPopup()
  info.value = {}
}

//弹出层
const show = ref(false)
const showPopup = () => {
  show.value = true
}

//编辑地址
const info = ref<any>({})
const onEdit = (item: any, index: any) => {
  showPopup()
  info.value = {
    name: item.name,
    tel: item.tel,
    addressDetail: item.addressDetail,
    province: item.province,
    city: item.city,
    county: item.county,
    isDefault: item.isDefault,
    id: list.value[index].id
  }
  console.log(item, index)
}

//保存地址
const onSave = async (content: any) => {
  delete content.country
  delete content.areaCode
  //修改操作
  if (info.value.id) {
    try {
      if (content.isDefault === true) {
        toggledefault()
      }
      await editaddressApi(content)
      show.value = false
      LoadData()
      showToast('修改地址成功')
    } catch (err) {
      console.log(err)
    }
  } else {
    //新增操作
    content.u_id = store.user?.u_id
    try {
      if (content.isDefault === true) {
        toggledefault()
      }
      await addaddressApi(content)
      show.value = false
      LoadData()
      showToast('新增地址成功')
    } catch (err) {
      console.log(err)
    }
  }
}

//删除地址操作
const onDelete = async (content: any) => {
  try {
    console.log(content.id)

    await deladdressApi(content.id)
    show.value = false
    LoadData()
    showToast('删除地址成功')
  } catch (err) {
    console.log(err)
  }
}
//切换默认
const toggledefault = async () => {
  if (address.value === undefined) return
  for (let i = 0; i < address.value.length; i++) {
    if (address.value[i].isDefault === 1) {
      await toggledefaultApi(address.value[i].id)
    }
  }
}

//选择
const order_store = orderUseStore()
const selectFn = (item: any) => {
  order_store.getaddress(item)
  router.back()
}

//加载渲染

const historyBack = ref(false)
onMounted(async () => {
  LoadData()
  historyBack.value = history.state?.back === '/order' ? true : false
})
</script>

<template>
  <div class="patient-page">
    <cp-navbar title="收货地址"></cp-navbar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      :switchable="historyBack ? true : false"
      @add="onAdd"
      @edit="onEdit"
      @select="selectFn"
    />

    <!-- 弹出层 -->
    <van-popup
      v-model:show="show"
      position="left"
      :style="{ width: '100%', height: '100%' }"
    >
      <cp-navbar
        :title="info.name ? '编辑地址' : '新增地址'"
        :back="() => (show = false)"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
        :show-delete="info.name ? true : false"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        :address-info="info"
      />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  .van-popup {
    .van-address-edit {
      padding-top: 46px;
    }
  }
}
</style>
