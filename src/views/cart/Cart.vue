<template>
  <div class="cart">
    <nav-bar class="nav-cart"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-button-bar class="cart-button-bar"></cart-button-bar>
  </div>

  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { mapGetters } from "vuex"  //vuex 知识点
import CartList from './childComps/CartList.vue'
import CartButtonBar from './childComps/CartButtonBar.vue'
 

  export default {
    name: "Cart",
    components: { 
      NavBar,
      CartList,
      CartButtonBar
     },
    computed: {
      ...mapGetters(['cartLength'])
    }

  }
</script>

<style scoped>  
  .cart {
    height: 100vh;
  }
  .nav-cart {
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }

  .cart-button-bar {
    position: relative;
    width: 100%;
    height: 30px;
    margin-top: -79px;
    background-color: #fff;
    /* z-index: 10000px; */
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, .1);
  }
</style>
