<script setup lang="ts">
import { ref } from 'vue'
import { showToast, type FormInstance } from 'vant'
import { edituserApi } from '@/services/user'
import { useUserStore } from '@/stores'
import { mobileRules } from '@/utils/rules'

defineProps<{
  title: string
  placeholder: string
}>()

const emit = defineEmits(['showvalue'])
const store = useUserStore()
const mobile = ref()

const formRef = ref<FormInstance>()

const value = ref()

const onSubmit = async (data: any) => {
  data.u_phone = store.user?.u_phone
  console.log(data)
  try {
    const res = await edituserApi(data)
    emit('showvalue', false)
    await store.loadData()
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

//获取验证码
const time = ref(0)
let timeId = ref()
const send = async () => {
  try {
    if (time.value > 0) return
    showToast('发送成功')
    time.value = 60
    timeId.value = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId.value)
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <!-- 遮罩层 -->
  <div class="editForm-page">
    <cpNavbar
      :title="title"
      right-text="保存"
      :back="
        () => {
          $emit('showvalue', false)
        }
      "
      @click-right="formRef?.submit"
    ></cpNavbar>
    <van-form
      @submit="onSubmit"
      submit-on-enter
      ref="formRef"
      v-if="title === '修改用户名'"
    >
      <van-cell-group inset>
        <van-field v-model="value" name="u_name" :placeholder="placeholder" />
      </van-cell-group>
    </van-form>
    <van-form v-else-if="title === '修改密码'">
      <van-cell-group inset>
        <!--修改密码短信验证码  -->
        <van-field
          placeholder="请输入手机号"
          :rules="mobileRules"
          name="mobile"
          v-model="mobile"
          type="tel"
        ></van-field>

        <van-field placeholder="短信验证码">
          <template #button>
            <span class="btn-send" @click="send">{{
              time > 0 ? `${time}s后再次发送` : '发送验证码'
            }}</span>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.editForm-page {
  background-color: #f7f9fa;
  height: 100%;
}
.van-form {
  padding-top: 50px;
  .van-cell-group--inset {
    margin: 0;
    border-radius: 0;
  }
}
</style>
