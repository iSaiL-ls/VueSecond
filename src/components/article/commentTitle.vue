<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{ datalength }})</span>
    </p>
    <div class="commetMyinfo">
      <img :src="user.user_img" alt="" v-if="user.user_img" />
      <img src="../../assets/default_img.jpg" alt="" v-else />

      <input
        type="text"
        placeholder="请您尽情BB！！！"
        v-if="user.user_img"
        v-model="comcotent"
        ref="postipt"
      />
      <input
        type="text"
        placeholder="没登陆还不能喷人哦~ ~ ~ ~"
        disabled
        v-else
      />
      <button @click="commentPublish">啾啾~~</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comcotent: ''
    }
  },
  props: ['user', 'datalength'],
  methods: {
    commentPublish() {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) {
        this.$msg.fail('请先登录')
      } else {
        this.$emit('Postcoment', this.comcotent)
        this.comcotent = ''
      }
    },

    focusIpt() {
      this.$refs.postipt.focus()
    }
  },
  updated() {
    this.focusIpt()
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 8.333vw 2.778vw 0 2.778vw;
  .comment-title {
    span:nth-child(2) {
      color: #aaa;
      margin-left: 2.778vw;
    }
  }
  .commetMyinfo {
    padding: 2.778vw 0;
    display: flex;

    img {
      width: 8.333vw;
      height: 8.333vw;
      border-radius: 50%;
    }
    input {
      outline: none;
      border: 0;
      background-color: #f4f4f4;
      border-radius: 3.611vw;
      font-size: 2.778vw;
      // color: #ccc;
      padding: 0 5.556vw 0 4.167vw;
      margin-left: 2.778vw;
    }
    button {
      outline: none;
      border: 0;
      border-radius: 12px;
      // counter-reset: #fb7299;
      margin-left: 10px;
      color: #fff;
      background-color: #fb7299;
      padding: 0 15px;
    }
  }
}
</style>
