<script setup lang="ts">
import router from '@/router'
import { searchApi, TagSearchApi } from '@/services/type'
import { onMounted } from 'vue'
import { ref } from 'vue'

// const getImageUrl = (name: string) => {
//   return new URL(`../../assets/sort/${name}`, import.meta.url).href
// }

const select = ref(0)
//排序
let sortOrder = ref<any>(0)
const changeselect = async (index: number, sort: string, method: string) => {
  select.value = index
  loadData(sort, method)
}

//加载相关数据
import { useRoute } from 'vue-router'
const route = useRoute()
const data = ref()
const loadData = async (sort: string, method: string) => {
  let config: any = { p_name: route.query.content || route.query.name }
  if (sort) {
    ;(config.sort = sort), (config.method = method)
  }
  try {
    const res = route.query.content
      ? await searchApi(config)
      : await TagSearchApi(config)
    data.value = res
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  loadData('p_name', 'desc')
})
</script>

<template>
  <cp-navbar
    title="搜索结果"
    right-text="主页"
    @click-right="$router.push('/sort')"
  ></cp-navbar>

  <div class="product-page">
    <!-- 排序 -->
    <div class="sort">
      <van-row>
        <van-col span="8" @click="changeselect(0, 'p_name', 'desc')"
          ><a href="javascript:;" :class="{ active: select === 0 }"
            >综合
          </a></van-col
        >
        <van-col span="8" @click="changeselect(1, 'p_sale', 'desc')"
          ><a href="javascript:;" :class="{ active: select === 1 }"
            >销量</a
          ></van-col
        >
        <van-col
          span="8"
          @click="
            sortOrder === 0
              ? (changeselect(2, 'p_price', 'asc'), (sortOrder = 1))
              : (changeselect(2, 'p_price', 'desc'), (sortOrder = 0))
          "
        >
          <a href="javascript:;" :class="{ active: select === 2 }">
            价格
            <cp-icon
              class="icons"
              :name="
                select === 2
                  ? sortOrder === 0
                    ? 'product-sort_desc'
                    : 'product-sort_asc'
                  : 'product-sort'
              "
            ></cp-icon>
          </a>
        </van-col>
      </van-row>
    </div>
    <!-- 商品卡片 -->
    <div class="item">
      <van-row>
        <van-col
          span="12"
          v-for="(item, index) in data"
          :key="index"
          @click="router.push({ path: '/items', query: { p_id: item.p_id } })"
        >
          <van-image
            width="100%"
            fit="cover"
            round
            :src="
              item.p_image != null
                ? 'http://localhost:3000/upload/' +
                  `${JSON.parse(item.p_image)[0]}`
                : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
            "
          />
          <div class="info">
            <div class="title">{{ item.p_name }}</div>
            <div class="price">￥{{ item.p_price }}</div>
            <div class="sale">已销售{{ item.p_sale }}件</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep().van-nav-bar__text {
  color: black;
}
.product-page {
  padding-top: 46px;
  .sort {
    .van-row {
      height: 35px;
      background-color: #fff;
      margin-bottom: 8px;
      .van-col {
        display: flex;
        justify-content: center;
        align-items: center;
        .icons {
          vertical-align: middle;
        }
        .active {
          color: #ff894c;
        }
      }
    }
  }
  .item {
    padding: 0 5px;
    .van-row {
      .van-col {
        $radius: 8px;
        height: 275px;
        margin-bottom: 8px;
        border-radius: $radius;
        background-color: #fff;
        &:nth-child(odd) {
          border-right: 4px solid #f3f5f7;
        }
        &:nth-child(even) {
          border-left: 4px solid #f3f5f7;
        }
        .van-image {
          height: 194px;
          border-radius: $radius $radius 0 0;
        }
        .info {
          padding: 8px;
          .title {
            font-size: 14px;
            color: #464858;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            font-size: 17px;
            font-weight: bold;
            color: #ff7c74;
          }
          .sale {
            font-size: 12px;
            color: #464858;
          }
        }
      }
    }
  }
}
</style>
