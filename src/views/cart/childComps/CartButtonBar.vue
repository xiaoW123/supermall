<template>
  <div class="cart-button-bar">
    <div class="cart-button-item item">
      <check-button 
          class="check-button" 
          :isChecked="isSelectAll"
          @click.native="checkClick"></check-button> 
      <span>全选</span>      
    </div>
    <div class="item">
      <div class="price-sum">合计：{{totalPrice}}</div>
    </div>
    <div class="item">
      <div class="price-computed" >去结算({{checkLength}})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  components: { CheckButton },
  name: 'CartButtonBar',
  methods: {
    checkClick() {
      //全选
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false);
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    totalPrice() {
      // 计算合计
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price.substr(1) * item.count 
      },0).toFixed(2)
    },
    checkLength() {
      //结算
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 1.使用filter
      // return !this.$store.state.cartList.filter(item => !item.checked).length
      if(this.$store.state.cartList.length === 0) return false
      // 2.使用find方法
      // return !this.$store.state.cartList.find(item => !item.checked)

      // 3.使用for遍历
      for(let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    } 
  }

}
</script>

<style scoped>
  .cart-button-bar {
    display: flex;
    padding: 5px;
  }

  .item {
    flex: 1;
  }
  .cart-button-item {
    display: flex;
  }

  .cart-button-item span {
    flex: 1;
    font-size: 15px;
    line-height: 23px;
    margin-left: 5px;
  }

  .price-sum {
    font-size: 15px;
    margin-left: -40px;
    line-height: 23px;
  }

  .price-computed {
    height: 30px;
    color: #fff;
    background-color: orangered;
    /* line-height: ; */
    margin-top: -5px;
    margin-right: -5px;
    line-height: 30px;
    text-align: center;
    
  }
</style>>

