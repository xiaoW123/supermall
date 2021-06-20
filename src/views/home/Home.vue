<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
    <!-- 轮播图组件 -->
    <child-comps :banners="banners"/>

    <!-- 活动福利组件 -->
    <recommen-view :recommends="recommends"/>

    <!-- 排行榜组件  -->
    <feature-view />

    <!-- 流行、新款、精选 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <goods-list :goods="goods[currentType]" />

    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
    <h2>22222</h2>
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

export default {
  name: "Home",
  components: {
    NavBar,
    ChildComps,
    RecommenView,
    FeatureView,
    TabControl,
    GoodsList,
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
    };
  },
  created() {
    this.getHomeMutidata();

    this.getProductData("pop");
    this.getProductData("new");
    this.getProductData("sell");
  },
  methods: {
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
      console.log(index);
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
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;

  background-color: var(--color-tint);
  text-align: center;
  color: var(--color-background);
}

.tab-control {
  /* 粘性定位不兼容IE */
  position: sticky;
  z-index: 9;
  top: 44px;
}
</style>
