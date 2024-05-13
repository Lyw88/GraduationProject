<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByPassword, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { showToast, type FormInstance, showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'
import { onUnmounted } from 'vue'
import { useShopCarStore } from '@/stores/modules/shopcar'

const mobile = ref<string>('13027941053')
const password = ref<string>('abc12345')
const code = ref<string>('')

const show = ref<boolean>(false)
const agreen = ref<boolean>(false)
const isPass = ref(true)

const router = useRouter()
const test = ref()
// 表单提交
const login = async () => {
  try {
    if (!agreen.value) {
      return showToast('请勾选协议')
    }
    // 验证完毕，进行登录
    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await loginByMobile(mobile.value, code.value)
    const userStore = useUserStore()
    userStore.getUser(res.data)
    test.value = res.data
    router.push(
      (router.currentRoute.value.query.returnUrl as string) || '/user'
    )
    car_store.LoadData()
    return showSuccessToast('登陆成功')
  } catch (err) {
    console.log(err)
  }
}

//获取验证码
const form = ref<FormInstance>()
const time = ref(0)
let timeId = ref()
const send = async () => {
  try {
    if (time.value > 0) return
    await form.value?.validate('mobile')
    // await getCode(mobile.value, 'login')
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

const car_store = useShopCarStore()
onUnmounted(() => {
  window.clearInterval(timeId.value)
})
</script>

<template>
  <div class="login-page">
    <cp-navbar
      title="登录 "
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-navbar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login" ref="form">
      <van-field
        placeholder="请输入手机号"
        :rules="mobileRules"
        name="mobile"
        type="tel"
        v-model="mobile"
      ></van-field>
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        v-model="password"
      >
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cp-icon>
        </template>
      </van-field>

      <van-field
        v-else
        placeholder="短信验证码"
        v-model="code"
        :rules="codeRules"
      >
        <template #button>
          <span class="btn-send" @click="send">{{
            time > 0 ? `${time}s后再次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agreen">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    padding: 14px 16px;
    line-height: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    vertical-align: middle;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
}

.btn-send {
  color: var(--cp-primary);
  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
