<template>
  <div class="toast" v-show="isShow" >
    <p>{{str}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // 1.原方法
    // str: {
    //   type: String,
    //   default: '哈哈哈',
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      str: '',
      isShow: false
    }
  },
  methods: {
    // 2.插件方法
    show(str, duration) {
      this.isShow = true
      this.str = str

      setTimeout(() => {
        this.isShow = false
        this.str = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
 .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color:rgba(0,0,0,.75);
    padding: 8px 10px;
    font-size: 12px;
    z-index: 100;
  }
</style>