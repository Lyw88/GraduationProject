<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { showToast, type FormInstance } from 'vant'
import { mobileRules, passwordRules } from '@/utils/rules'
import { registerApi } from '@/services/user'
import router from '@/router'

const phone = ref('')
const password = ref('')

const form = ref<FormInstance>()

// 表单提交
const register = async () => {
  try {
    const res = await registerApi({
      u_phone: phone.value,
      u_pwd: password.value
    })
    if (res.code === 500) {
      showToast(res.message)
    } else {
      router.push('/login')
      showToast(res.message)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="register-page">
    <cp-navbar title="注册"></cp-navbar>
    <van-form @submit="register" ref="form">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="mobileRules"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="passwordRules"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.register-page {
  .van-form {
    padding-top: 66px;
    .van-cell-group {
      border-radius: 0;
    }
  }
}
</style>
