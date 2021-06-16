<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
    <child-comps :banners="banners"></child-comps> <!-- 轮播图组件 -->
    <recommen-view :recommends="recommends"></recommen-view> <!-- 活动福利组件 -->
    <feature-view></feature-view> <!-- 排行榜组件  -->
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
// import NavBar from 'comonnents/common/navbar/NavBar.vue'
import NavBar from 'components/common/navbar/NavBar.vue'
import {getHomeMutidata} from 'network/home.js'
import ChildComps from './childComps/ChildComps.vue'
import RecommenView from './childComps/RecommenView.vue'
import FeatureView from './childComps/FeatureView.vue'


  export default {
    name: "Home",  
    components: {
      NavBar,
      ChildComps,
      RecommenView,
      FeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMutidata().then(result => {
        // console.log(result.data.data.banner)
        this.banners = result.data.data.banner
        this.recommends = result.data.data.recommend
      }).catch((err) => {
        console.log(err)
      });
    }
  }
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
</style>
