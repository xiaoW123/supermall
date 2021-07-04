<template>
  <div class="check-button" :class="{check: isChecked}" >
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'ChekButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  }
}
</script>

<style scoped>  
  .check-button {
    /* background-color: pink; */
    /* border: 1px solid #f5f5f5; */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
  }  

  .check-button img{
    width: 20px;
    height: 20px;
    /* line-height: 20px; */
    /* text-align: center; */
    /* margin-top: calc(50% - 8px); */
    /* margin-left: calc(50% - px); */

    
  }

  .check {
    background-color: pink;
    border: 0;
  }
</style>