<template>
  <div class="cart-list">
    <scroll class="content" ref="Scroll">
      <cart-list-item 
        v-for="(item,index) in cartList" 
        :key="index"
        :cart-item="item" ></cart-list-item> 
    </scroll>
   

  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from "vuex"
import Scroll from 'components/common/scroll/Scroll.vue'



export default {
  name: "CartList",
  components: { 
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(['cartList', 'cartLength'])
  },
  activated() {
    // if ( this.cartLength !== 0) {
      this.$refs.Scroll.refresh()
    // }
      
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px);
  }

  /* .cart--list {
    /* height: calc(100%-44px); */
    /* height: calc(100% - 44px -49px); */
  /* } */
  /* .content { */
    /* height: calc(100% - 44px -49px); */
    /* overflow: hidden; */
  /* }  */
</style>