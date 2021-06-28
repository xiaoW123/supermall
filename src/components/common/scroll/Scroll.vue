<template>
  <div class="wrapper" ref="aaa">
    <div class="content">
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    // 1.创建 bscroll 对象
    this.scroll = new BScroll(this.$refs.aaa,{
      probeType: this.probeType, // 是一个组件所以不是每个页面的滚动效果都是一样的
      pullUpLoad: this.pullUpLoad,
      click: true
    }),

    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
    })
    
    // 3.上拉加载更多
    this.scroll.on('pullingUp', () => {
        // console.log('上啦加载更多');
        // BScroll.finishPullUp() 使其多次上拉加载，必须调用该函数
        this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
  }
}
</script>

<style scoped>
  .wrapper {
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>