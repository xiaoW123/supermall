<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more"> 更多</div> <i class="arrow-fight"></i>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span class="info-title">{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils.js"
export default {
  name: 'DetaCommentInfo',
  data() {
    return {
    }
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)

      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    /* width: 100%; */
    border-bottom: 5px solid #f2f5f8;
    padding-bottom: 50px;
  }
  .info-header {
    display: flex;
    height: 44px;
    width: 100%;
    /* background-color: pink; */
    line-height: 44px;
    font-size: 15px;
    border-bottom: 2px solid #f2f5f8;
  }

  .info-header .header-title {
    margin-left: 13px;
  }

  .info-header .header-more {
    margin-left: 70%;
    font-size: 10px;
  }

  .info-user {
    display: flex;
    align-items: center;
    padding: 10px 0;
    line-height: 45px;
  }

  .info-user img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0,.1);
    margin-left: 20px;
  }

  .info-user  .info-title {
    font-size: 13px;
    margin-left: 20px;
    vertical-align: center;
  }

  .info-detail p {
    font-size: 13px;
    margin-left: 20px;
  }

  .info-other {
    font-size: 10px;
    margin-left: 20px;
    margin-top: 10px;
    color: #afaeae;
  }

  .info-other .date {
    margin-right: 10px;
  }
  .info-imgs {
    padding-left: 20px;
    padding-top: 10px;
  }
  .info-imgs img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
</style>