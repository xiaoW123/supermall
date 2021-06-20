<template>
<div class="tab-control">
  <div class="tab-control-tiem" 
      v-for="(item,index) in titles" 
      :key="index"
      :class="{active: currentIndex === index}"
      @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
    font-size: 15px;
  }

  .tab-control-tiem {
    flex: 1;
    text-align: center;
  }

  .tab-control-tiem span {
    padding: 5px;
    
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom:2px solid var(--color-high-text);
  }
</style>