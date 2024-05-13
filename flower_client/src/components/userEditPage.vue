<script setup lang="ts">
import { ref } from 'vue'
import UserEditForm from './userEditForm.vue'
import { edituserApi } from '@/services/user'
import { useUserStore } from '@/stores'

//用户持久化数据
const store = useUserStore()

const emit = defineEmits(['valueChanged'])

// 遮罩层开关
const show = ref(false)
const showPopup = () => {
  show.value = true
}

const showChange = (newval: boolean) => {
  show.value = newval
}

//传递数据
const title = ref()
const placeholder = ref()

//文件上传
const afterRead = async (data: any) => {
  try {
    data.content = data.content.split(',')[1]
    const res = await edituserApi({
      u_avatar: data.content,
      u_phone: store.user?.u_phone
    })
    console.log(res)
    await store.loadData()
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <cp-navbar
    title="个人资料"
    :back="
      () => {
        emit('valueChanged', false)
      }
    "
  ></cp-navbar>
  <div class="userEdit-page">
    <!-- 基础信息 -->
    <div class="type">基础信息</div>
    <van-cell-group>
      <van-uploader :after-read="afterRead">
        <template #default>
          <van-cell title="头像" is-link>
            <template #value>
              <van-image
                width="44px"
                height="44px"
                fit="cover"
                round
                :src="
                  store.user_info?.u_avatar != null
                    ? 'data:image/png;base64,' + store.user_info?.u_avatar
                    : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
                "
              />
            </template>
          </van-cell>
        </template>
      </van-uploader>
      <van-cell
        title="昵称"
        is-link
        :value="store.user_info?.u_name"
        @click="
          () => {
            showPopup(), (title = '修改用户名'), (placeholder = '用户名')
          }
        "
      />
      <van-cell
        title="密码"
        is-link
        @click="
          () => {
            showPopup(), (title = '修改密码'), (placeholder = '请输入新密码')
          }
        "
      />
    </van-cell-group>
    <!-- 账号绑定 -->
    <!-- 遮罩层 -->
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <user-edit-form
        @showvalue="showChange"
        :title="title"
        :placeholder="placeholder"
      ></user-edit-form>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.userEdit-page {
  padding-top: 46px;
  .type {
    height: 45px;
    line-height: 40px;
    padding: 0 15px;
    background-color: #f7f9fa;
  }
  .van-cell-group {
    .van-cell {
      display: flex;
      align-items: center;
      .van-image {
        vertical-align: middle;
      }
    }
    .van-uploader {
      .van-cell {
        width: 100vw;
      }
      &:active {
        .van-cell {
          background-color: #f2f3f5;
        }
      }
    }
  }
}
</style>
