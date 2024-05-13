<script setup lang="ts">
import { ref } from 'vue'

const getImageUrl = (name: string) => {
  return new URL(`../../assets/home/${name}`, import.meta.url).href
}

const images = ref([
  'https://img02.hua.com/slider/23_birthday_m.jpg',
  'https://img02.hua.com/slider/24_spring_banner_m.jpg?a1',
  'https://img02.hua.com/slider/22_nuandong_banner_m.jpg?a1',
  'https://img02.hua.com/slider/23_brand_banner_m.jpg'
])

const string = ref(
  '爱情时光33朵红玫瑰,爱情时光33朵红玫瑰---深情挚爱/33枝·卡罗拉玫瑰33枝'
)
</script>

<template>
  <div class="home_page">
    <!-- 标题 -->
    <div class="banner">
      <van-image height="40" :src="getImageUrl('m_home_logo.png')" />
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <van-image :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div class="company_info">
      <span><van-icon name="good-job-o" />匠心花艺</span>
      <span><van-icon name="gem-o" />优质体验</span>
      <span><van-icon name="underway-o" />两小时送达</span>
      <span><van-icon name="service-o" />客服在线</span>
    </div>
    <!-- 引导 -->
    <div class="guide">
      <van-row>
        <van-col span="6">
          <van-image round :src="getImageUrl(`flower1.png`)" />
          <div>恋爱表白</div>
        </van-col>
        <van-col span="6">
          <van-image round :src="getImageUrl(`flower2.png`)" />
          <div>恋爱表白</div>
        </van-col>
        <van-col span="6">
          <van-image round :src="getImageUrl(`flower3.png`)" />
          <div>父母长辈</div>
        </van-col>
        <van-col span="6">
          <van-image round :src="getImageUrl(`flower4.png`)" />
          <div>开业花篮</div>
        </van-col>
      </van-row>
    </div>
    <!-- banner -->
    <div class="rec">
      <van-image
        class="left"
        round
        fit="cover"
        :src="getImageUrl(`banner.jpg`)"
      />
      <div class="right">
        <van-image round fit="cover" :src="getImageUrl(`banner1.jpg`)" />
        <van-image round fit="cover" :src="getImageUrl(`banner2.jpg`)" />
      </div>
    </div>
    <!-- 今日推荐 -->
    <div class="day_rec">
      <h3 class="day_title">今日推荐</h3>
      <van-row>
        <van-col span="12">
          <van-image
            round
            fit="cover"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div class="product-info">
            <p class="product_title">{{ string }}</p>
            <div class="data">
              <i>￥280</i>
              <span>已销售1.5万件</span>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <van-image round fit="cover" :src="getImageUrl(`banner2.jpg`)" />
          <div class="product-info">
            <p class="product_title">{{ string }}</p>
            <div class="data">
              <i>￥280</i>
              <span>已销售1.5万件</span>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <van-image round fit="cover" :src="getImageUrl(`banner2.jpg`)" />
          <div class="product-info">
            <p class="product_title">{{ string }}</p>
            <div class="data">
              <i>￥280</i>
              <span>已销售1.5万件</span>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home_page {
  padding: 0 12px 65px 12px;

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
  }
  .van-swipe {
    border-radius: 10px;
    .van-image {
      width: 100%;
      height: 180px;
    }
  }
  .company_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    font-size: 11px;
    color: #8a9095;
  }
  .guide {
    .van-row {
      background-color: #fff;
      border-radius: 12px;
      padding: 5px 0 10px 0;
      .van-col {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .rec {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    height: 155px;
    .left {
      flex: 1;
      border-radius: 12px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      padding-left: 5px;
      .van-image {
        height: 50%;
        box-sizing: border-box;
        border-radius: 12px;
        &:first-child {
          padding-bottom: 2.5px;
        }
        &:last-child {
          padding-top: 2.5px;
        }
      }
    }
  }
  .day_rec {
    margin-top: 10px;
    background-color: #f3f5f7;
    border-radius: 12px;

    .day_title {
      padding: 6px;
    }
    .van-col {
      position: relative;
      height: 215px;
      background-color: #fff;
      border-bottom: 10px solid #f3f5f7;
      border-right: 6px solid #f3f5f7;
      border-radius: 20px;
      &:nth-child(2n) {
        border-right: 0;
        border-left: 6px solid #f3f5f7;
      }
      .van-image {
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: 115px;
      }
      .product-info {
        padding: 0 4px 7px 4px;
        .product_title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
        .data {
          position: absolute;
          bottom: 10px;
          left: 3px;
          i {
            color: #ff3d12;
            font-size: 15px;
            font-weight: 700;
            font-style: normal;
          }
          span {
            color: #71797f;
            font-size: 12px;
            padding-left: 42px;
          }
        }
      }
    }
  }
}
</style>
