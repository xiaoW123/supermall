<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addTocart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalilBottomBar',
  methods: {
    addTocart() {
      this.$emit("addCart")
    }
  }

}
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;

    display: flex;
    text-align: center;
    box-shadow:0 10px 10px 10px rgba(0, 0, 0, .1);
  }

  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item > div{
    flex: 1;
  }

  .bar-left .text {
    font-size: 12px;
  }

  .bar-item .icon {
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    margin: 10px auto 3px;
    z-index: 100;
    /* border: 2px solid red; */
  }

  .bar-item .service {
    background-position:0 -53px;
  }

  .bar-item .shop{
    background-position:0 -98px;
  }

  .bar-item .select {
    background-position:0 0;
  }

  .bar-right {
    height: 58px;
    background: red;
    line-height: 58px;
    font-size: 15px;
  }

  .cart {
    background:yellow;
    
  }

  .buy {
    background:pink;
    /* font-size: 15px; */
    color: #fff;
  }
</style>