<template>

  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll  class="content" ref="Scroll" @scroll="contentScroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>

      <!-- 商品详情页 -->
      <detail-base-info :goods="goods"></detail-base-info>

      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      

      <!-- 商品详细 -->
      <detail-goods-info :detail-info="detailInfo" @imagesLoad = "imagesLoad"></detail-goods-info>
     
      <!-- 商品参数 -->
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>

      <!-- 用户评论 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>

      <!-- 商品推荐 -->
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" ></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <!-- 点击加入购物车弹出窗 -->
    <toast></toast>



    

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import { _getDetail, getRecommend, Goods, Shop, GoodsParam, debounce} from "network/detail.js";
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import Scroll from 'components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import BackTop from 'components/content/backtop/BackTop.vue';
import Toast from 'components/common/toast/Toast.vue';


  export default {
    components: {
      DetailNavBar, 
      DetailSwiper, 
      DetailBaseInfo, 
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast,
    },
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: {},
        themeTopys: [],  //获取导航对应模块的offsetTop
        getThemeTopy: null,
        currentIndex: 0,
        isShowBackTop: false,
        // isShow: false,
        // str: '哈哈哈'
      }
    },
    created() {
      //没有获取新的iid，可以使用 在keep-alive中 exclude='Detail' 销毁
      // 这样每次都是获取到新的
      //1. 获取iid
      this.iid = this.$route.params.iid  

      //2.详情页数据请求
      _getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.data.result
        // 1.轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.商品基本信息，用类进行整合数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)         
        // console.log(this.goods)

        // 3.店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(this.shop)

        //4.商品详细展示
        this.detailInfo = data.detailInfo
        // console.log(this.detailInfo)

        //5.商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // console.log(this.paramInfo)
 
        // 6.商品评论信息
        if (data.rate.cRare != 0) {
          this.commentInfo  = data.rate.list[0]
          // console.log(this.commentInfo)
        }
      }).catch(err =>   {
        console.log(err)
      });

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.data
        // console.log(this.recommends)
      }).catch(err => {
        console.log(err)
      })

      this.$bus.$on('detailItemImgLoad', () => {
      // console.log('------')
        this.$refs.Scroll.refresh()
      })

      // 4.  themeTopys防抖
      this.getThemeTopy = debounce(() => {
        this.themeTopys = []
        this.themeTopys.push(0)
        this.themeTopys.push(this.$refs.param.$el.offsetTop);
        this.themeTopys.push(this.$refs.comment.$el.offsetTop);
        this.themeTopys.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopys.push(Number.MAX_VALUE);
        // console.log(this.themeTopys)
      },100)

      // this.$nextTick(()=>{
      //   //因为渲染的有一点满所以不能立即拿到offsetTop，
      //   // 但是图片还没加载，不计算在内
      //   this.themeTopys = []
      //   this.themeTopys.push(0)
      //   this.themeTopys.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopys.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopys.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopys)
      // })   
    },
    mounted() {

    },
    updata() {

    },
    methods: {
      imagesLoad() { 
        this.$refs.Scroll.refresh()
        this.getThemeTopy()
        // 这里已经通过 imagesLoad函数解决了以下获取多次offsetTop
        // 还可以使用防抖 用法见笔记
        // this.themeTopys = []
        // this.themeTopys.push(0)
        // this.themeTopys.push(this.$refs.param.$el.offsetTop);
        // this.themeTopys.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopys.push(this.$refs.recommends.$el.offsetTop);
        // console.log(this.themeTopys)
      },
      // 点击导航滚动到响应位置
      titleClick(index) { 
        // console.log(index) //获取下标
        this.$refs.Scroll.scrollTo(0, -this.themeTopys[index], 100) //g
      },
      contentScroll(position) {
        const positionY = -position.y
        // console.log(-position.y)
        let length = this.themeTopys.length
        for (let i = 0; i < length-1; i++) {
          // if ((i < length - 1 && positionY > this.themeTopys[i] && positionY < this.themeTopys[i+1] )
          //     || (i === length -1 && positionY > this.themeTopys[i])) {
          //       // console.log(i)
          //       this.$refs.detailNavBar.currentIndex = i
          //     }
          if (this.currentIndex !== i && (positionY >= this.themeTopys[i] && positionY < this.themeTopys[i+1])) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.detailNavBar.currentIndex= this.currentIndex
          }
        }
        //回到顶部
        this.isShowBackTop = (-position.y) > 1000 
        // this.isTabFiexed = (-position.y) > this.tabOffsetTop
      },
      backClick() {
        this.$refs.Scroll.scrollTo(0, 0)
      },
      //点击添加购物车
      addCart() {
        // console.log('---------')
        // 用 VUex封装数据
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid
        
        this.$store.dispatch('addCart', product)
        // console.log(this.$store.state.cartList.length)

        // 1.利用promise 监听Vuex的操作
        // this.$store.dispatch("addCart", product).then(res => {
        //   //完成弹窗
        //   this.isShow = true
        //   this.str = res
        //   // console.log(res)
        //   setTimeout(() => {
        //     this.isShow = false
        //     this.str = ''
        //   }, 1000);
        // })


        // 2.也可以用mapActions进行映射，与mapGetters一样
        // ...mapActions([])

        // 3.进行插件封装

        this.$store.dispatch("addCart", product).then(res => {
          this.$toast.show(res, 2000)
        })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px -58px);
  }
  
 
</style>