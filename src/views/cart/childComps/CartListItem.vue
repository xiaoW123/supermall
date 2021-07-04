<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="cartItem.checked" @click.native="btnClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="cartItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartItem.title}}</div>
      <div class="item-desc">{{cartItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{cartItem.price}}</div>
        <div class="item-count right">×{{cartItem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  data() {
    return {
   
    }
  },
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    btnClick() {
      this.cartItem.checked = !this.cartItem.checked
    
    }
  }
}
</script>

<style>
  #shop-item {
    width: 100%;
    height: 120px;
    /* background-color: pink; */
    padding: 10px;
    border-bottom: 2px solid red;
    /* line-height: 120px; */
  }
  .item-selector {
    float: left;
    width: 20px;
    height: 20px;
    
    margin-top: 40px;
    margin-right: 10px;
    /* line-height: 120px; */
    border-radius: 50%;
    
  }
  .item-img {
    float: left;
  }

  .item-img img{
    width: 80px;
    height: 100px;
  }
  
  .item-info {
    width: 200px;
    margin-left: 140px;
  }

  .item-title {
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
  }

  .item-desc {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: slategray;
    margin-bottom: 30px;
  }

  .left {
    color: tomato;
    font-size: 13px
  }
</style>