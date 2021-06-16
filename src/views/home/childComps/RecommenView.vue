<template>
  <div class="recommen">
    <div v-for="(item, index) in recommends.list" :key="index" class="recommen-itme">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommenView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommen {
    display: flex;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom:  10px solid #eee;
  }

  .recommen-item {
    flex: 1;
    
  }

  .recommen img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

</style>