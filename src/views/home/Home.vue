<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="TabControl1" 
        v-show="isTabFiexed"/>

    <scroll
      ref="Scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :pullUpLoad="true"
      ><!-- 滚动效果 -->
      <!-- 轮播图组件 -->
      <child-comps :banners="banners" @swiperLmageLoad="swiperLmageLoad"/>

      <!-- 活动福利组件 -->
      <recommen-view :recommends="recommends" />

      <!-- 排行榜组件  -->
      <feature-view />

      <!-- 流行、新款、精选 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="TabControl2" v-show="!isTabFiexed"/>

      <goods-list :goods="goods[currentType]" />
    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <h2>22222</h2>
    <h2>22222</h2>
  </div>
</template>

<script>
// 网络请求
import { _getHomeMutidata } from "network/home.js";
import { _getProductData } from "network/home.js";

// 组件导入
import NavBar from "components/common/navbar/NavBar.vue";
import ChildComps from "./childComps/ChildComps.vue";
import RecommenView from "./childComps/RecommenView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/content/backtop/BackTop.vue';



export default {
  name: "Home",
  components: {
    NavBar,
    ChildComps,
    RecommenView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFiexed: false,
      saveY: 0
    };
  },

  created() {
    this.getHomeMutidata();

    this.getProductData("pop");
    this.getProductData("new");
    this.getProductData("sell");

    this.$bus.$on('itemImageLoad', () => {
      // console.log('------')
      this.$refs.Scroll.refresh()
    })
    
  },
  mounted(){
    // console.log(this.$refs.TabControl.$el.offsetTop)

  },
  activated() {
    //保存纪录
    this.$refs.Scroll.scrollTo(0, this.saveY, 0)
    this.$refs.Scroll.refresh()
  },
  deactivated() {
    // 保存纪录
    this.saveY = this.$refs.Scroll.scroll.y //保存处于活跃状态时的滚动高度
  },
  methods: {
    //根据点击获取 流行、精选、新款的数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index

      console.log(index);
    },
    //回到顶部使用 ref访问scroll子组件的scrollTo方法回到顶部
    backClick() {
      this.$refs.Scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000 
      this.isTabFiexed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      // console.log('上拉加载')
      this.getProductData(this.currentType)
      this.$refs.Scroll.refresh() //重新计算可滚动区域，解除不能滚动的bug
    },

    swiperLmageLoad() {
      // console.log('------')
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    /*
     *网络请求
     */
    getHomeMutidata() {
      _getHomeMutidata()
        .then((result) => {
          this.banners = result.data.data.banner;
          this.recommends = result.data.data.recommend;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProductData(type) {
      //获取页码
      const page = this.goods[type].page + 1;
      _getProductData(type, page).then((res) => {
        // console.log(res.data.data.list)
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data.data.list);
        this.$refs.Scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; 100视口 */
  overflow: hidden;
}

.nav-bar {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5; */

  background-color: var(--color-tint);
  text-align: center;
  color: var(--color-background);
}
/* 粘性定位不兼容IE */
/* .tab-control {
  position: sticky;
  z-index: 9;
  top: 44px;
} */
.tab-control {
   position: relative;
    z-index: 9;
}

</style>
