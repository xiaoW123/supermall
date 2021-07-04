<template>
<div>
  <div class="goods-list">
    <goods-list-item class="item" v-for="(item,index) in goods.list" 
    :key="index" :goodsItem="item" />
  </div>
</div>

  
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'CoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
 .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
    /* margin-bottom: 500px; */
  }
  .goods-list .item {
    width: 48%;
  }
</style>