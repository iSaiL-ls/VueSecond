<template>
  <div class="commenParent" v-if="commentList">
    <div v-for="(item, index) in commentList" :key="index">
      <!-- 一级 -->
      <div class="commentItem">
        <!-- 头像 -->
        <div class="userImg" v-if="item.userinfo">
          <img :src="item.userinfo.user_img" alt v-if="item.userinfo.user_img" />
          <img src="../../assets/default_img.jpg" alt v-else />
        </div>

        <!-- 用户名密码 -->
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
            <span>{{ item.comment_date }}</span>
          </p>
          <div>
            {{ item.comment_content }}
            <span
              class="publisha"
              @click="puublishClick(item.comment_id)"
            >回复</span>
          </div>
        </div>
      </div>
      <!-- 二级 -->
      <div style="padding-left:11.111vw;">
        <comment-item :commentchild="item.child" @PostPublish="puublishClick"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from './commentItem'
export default {
  data () {
    return {
      commentList: null
    }
  },
  components: {
    commentItem
  },
  methods: {
    // 获取数据
    async commentData () {
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      if (res.data) {
        this.$emit('lenthselect', res.data.length)
      }

      this.commentList = this.changeCommentData(res.data)
    },
    // 数据改造
    changeCommentData (data) {
      // 通过递归传递子id来进行查找
      function fn (temp) {
        var arr1 = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    // 回复消息
    puublishClick (id) {
      // 向父组件（文章页）发送数据
      this.$emit('puublishClick', id)
    }
  },
  created () {
    this.commentData()
  }
}
</script>

<style lang="less">
.commenParent {
  padding: 2.778vw 2.778vw;
  > div {
    border-bottom: 0.278vw solid #e7e7e7;
  }
  .commentItem {
    display: flex;
    padding: 4.167vw 0;
    // justify-content: space-between;
    .userImg {
      margin-right: 2.778vw;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
    .commentContent {
      position: relative;
      flex: 1;
      p {
        font-size: 3.611vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 4.167vw;
      }
      div {
        font-size: 3.611vw;
      }
      .publisha {
        position: absolute;
        right: 1.944vw;
        color: red;
      }
    }
  }
}
</style>
