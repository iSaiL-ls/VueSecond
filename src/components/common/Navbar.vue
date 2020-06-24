<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="../../assets/logo.png" alt />
    </div>
    <div>
      <p>
        请输入内容！
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img
        :src="user.user_img"
        alt
        v-if="user.user_img"
        style="border-radius:50%"
        @click="loginandedit"
      />
      <img
        src="../../assets/default_img.jpg"
        alt
        v-else
        @click="loginandedit"
      />
      <p>下载APP</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    // 判断用户是否登录
    loginandedit() {
      // 判断是否具有id
      if (localStorage.getItem('id') && localStorage.getItem('token')) {
        // 如果有就跳转到修改页面
        this.$router.push('/userinfo')
      } else {
        // 如果未登录就拦截到登录页面
        this.$router.push('/login')
      }
    }
  },
  created() {
    console.log(this.user)
  }
}
</script>

<style lang="less">
.navbar {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    img {
      width: 90%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    // justify-content: center;
    align-items: center;
    p {
      font-size: 3.333vw;
      line-height: 7.222vw;
      background-color: #f4f4f4;
      height: 7.222vw;
      position: relative;
      padding-left: 6.944vw;
      width: 90%;
      border-radius: 3.333vw;
      margin: 0 1.389vw;
      color: #aaa;
      .ipt-icon {
        position: absolute;
        left: 2.778vw;
        top: 50%;
        transform: translate(0, -40%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 6.667vw;
      height: 6.667vw;
    }
    p {
      margin: 0 2.222vw;
      padding: 1.389vw 2.778vw;
      background-color: #fb7299;
      color: #fff;
      border-radius: 0.833vw;
      font-size: 3.611vw;
    }
  }
}
</style>
