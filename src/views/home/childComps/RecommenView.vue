<template>
  <div class="recommen">
    <div v-for="(item, index) in recommends.list" :key="index" class="recommen-itme">
      <a :href="item.link">
        <img :src="item.image" alt=""><br>
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {  },
  name: 'RecommenView',
  props: {
    recommends: {
      type: [Array, Object],
      default() {
        return []
      },
      
      // required: true
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
    width: 75%;
    height: 75%;
    margin-bottom: 10px;
  }

</style>