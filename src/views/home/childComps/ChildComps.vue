<template>
  <div class= "childComps">
    <swiper>
      <swiper-item v-for="(item, index) in banners.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
  name: 'ChildComps',
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners:{
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
         // console.log('----------')
      this.$emit('swiperLmageLoad')
      this.isLoad = true
      }
     
    }
  }
};
</script>

<style>
</style>