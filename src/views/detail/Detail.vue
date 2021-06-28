<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <!-- 轮播图 -->
    <detail-swiper :topImages="topImages"></detail-swiper>

    <!-- 商品详情页 -->
   <detail-base-info :goods="goods"></detail-base-info>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import { _getDetail, Goods } from "network/detail.js";
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo';


  export default {
    components: { DetailNavBar, DetailSwiper, DetailBaseInfo,},
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      //没有获取新的iid，可以使用 在keep-alive中 exclude='Detail' 销毁
      // 这样每次都是获取到新的
      this.iid = this.$route.params.iid  


      //详情页数据请求
      _getDetail(this.iid).then((res) => {
        console.log(res)
        const data = res.data.result
        // 1.轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.商品基本信息，用类进行整合数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                              
        console.log(this.goods)

 
      }).catch((err) =>   {
        console.log(err)
      });
    },
    methods: {
      
    }
   
  }
</script>

<style scoped>

</style>