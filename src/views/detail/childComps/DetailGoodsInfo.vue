<template>

  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
      :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      //给图片绑定加载事件，但加载的次数等于图片的次数时表示加载完毕，
      // 此时向Detail组件发出一个函数，请求刷新，重新计算better-scroll的滚动高度
      if(++this.counter === this.imagesLength ) {
        this.$emit('imagesLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      //纪录加载的图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }

}
</script>

<style scoped>
  .goods-info {
    width: 100%;
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    /* z-index: 10; */
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>