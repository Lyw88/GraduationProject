<script setup lang="ts">
import router from '@/router'
import { Typeapi, Type_detailApi, searchApi } from '@/services/type'
import { showToast } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

// const getImageUrl = (name: string) => {
//   return new URL(`../../assets/sort/${name}`, import.meta.url).href
// }

// 输入框搜索模块
const search_value = ref<string>()
const product_data = ref()
const onClickButton = async () => {
  try {
    const res = await searchApi({ p_name: search_value.value })
    product_data.value = res
    if (Reflect.ownKeys(product_data.value).length === 0) {
      showToast('没有查询到相关数据')
    } else {
      router.push({ path: '/product', query: { content: search_value.value } })
    }
  } catch (err) {
    console.log(err)
  }
}

// 分类模块
const activeIndex = ref()

const items = ref()
const test = ref()
const data = async () => {
  const res = await Typeapi()
  test.value = res
  //@ts-ignore
  items.value = test.value.map((item: any) => ({
    text: item.s_name,
    s_id: item.s_id
  }))
  click_nav(0)
}

//左侧切换
const type_data = ref()
const has_img = ref()
const null_img = ref()
const click_nav = async (index: number) => {
  try {
    const res = await Type_detailApi(items.value[index].s_id)
    type_data.value = res
    if (Array.isArray(type_data.value)) {
      has_img.value = type_data.value.filter((item: any) => item.has_img === 1)
      null_img.value = type_data.value.filter((item: any) => item.has_img === 0)
    } else {
      has_img.value = null
      null_img.value = null
      return
    }
  } catch (err) {
    console.log(err)
  }
}

//右侧点击
const right_click = (name: string) => {
  router.push({ path: '/product', query: { name } })
}

onMounted(() => {
  data()
})
</script>

<template>
  <div class="sort-page">
    <!-- 搜索栏 -->
    <van-search
      v-model="search_value"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <van-button color="#ff734c" size="small" round @click="onClickButton">
          搜索
        </van-button>
      </template>
      <template #left-icon>
        <cp-icon name="user-搜索"></cp-icon>
      </template>
    </van-search>
    <!-- 分类选择 -->
    <van-tree-select
      v-model:main-active-index="activeIndex"
      :items="items"
      @click-nav="click_nav"
    >
      <template #content>
        <!-- 带图分类 -->
        <template v-if="has_img != null">
          <div class="img_sort" v-for="item in has_img" :key="item.t_id">
            <div class="title">
              <a>{{ item.t_title }}</a>
              <!-- <span>鲜花排行榜</span> -->
            </div>
            <van-row>
              <van-col
                span="8"
                v-for="items in item.product"
                :key="items.t_detail_id"
                @click="right_click(items.t_name)"
              >
                <van-image
                  round
                  width="56"
                  height="56"
                  fit="cover"
                  :src="'http://localhost:3000/sort/' + items.t_img"
                />
                <span>{{ items.t_name }}</span>
              </van-col>
            </van-row>
          </div>
        </template>
        <!-- 文字分类 -->
        <template v-if="null_img != null">
          <div class="text_sort" v-for="item in null_img" :key="item.t_id">
            <div class="title">
              <a>枝数</a>
            </div>
            <van-row class="text_sort_style">
              <van-col
                span="8"
                v-for="items in item.product"
                :key="items.t_detail_id"
                @click="right_click(items.t_name)"
              >
                <a>{{ items.t_name }}</a>
              </van-col>
            </van-row>
          </div>
        </template>
      </template>
    </van-tree-select>
  </div>
</template>

<style lang="scss" scoped>
.sort-page {
  height: 100%;
  .cp-icon {
    vertical-align: middle;
  }
  :deep().van-search__action {
    display: flex;
    align-items: center;
  }
  :deep().van-tree-select {
    height: calc(100vh - 55px - 54px) !important;
    .van-tree-select__nav {
      background-color: #fff;
      flex: none;
      .van-sidebar-item--select {
        color: #ff734c;
        &::before {
          width: 2px;
          height: calc(100% - 15px);
          background-color: #ff734c;
        }
      }
      .van-sidebar-item {
        background: #fff;
      }
      .van-badge__wrapper {
        font-weight: normal;
        font-size: 14px;
      }
    }
    .van-tree-select__content {
      background-color: #f3f5f7;
      padding: 10px;
      .van-sidebar {
        width: 20px;
      }
      .title_img {
        border-radius: 8px;
      }
    }
  }
  .img_sort,
  .text_sort {
    padding: 4px 8px 10px 4px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 12px;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      a {
        font-size: 14px;
      }
      span {
        font-size: 12px;
        color: #81888d;
      }
    }
    .van-row {
      .van-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 12px;
        span {
          font-size: 12px;
          margin: 8px 8px 0;
          color: #81888d;
        }
      }
    }
  }
  //文字分类专属样式
  .text_sort_style {
    .van-col {
      // margin-top: 12px;
      a {
        text-align: center;
        display: inline-block;
        width: 72px;
        height: 36px;
        line-height: 36px;
        background-color: #f7f9fa;
      }
    }
  }
}
</style>
