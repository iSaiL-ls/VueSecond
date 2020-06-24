<template>
  <div>
    <!-- 顶部 -->
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size:3.611vw" @click="$router.push('/login')">去登录</div>
    </login-top>
    <!-- 输入框 -->
    <login-text
      label="姓名"
      style="margin:4.167vw 0;"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="successIpt"
    ></login-text>
    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res => (username = res)"
    ></login-text>
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => (password = res)"
    ></login-text>
    <!-- 按钮 -->
    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop.vue'
import LoginText from '../components/common/LoginText.vue'
import LoginBtn from '../components/common/LoginBtn.vue'

export default {
  data () {
    return {
      name: '',
      username: '',
      password: ''
    }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    successIpt (content) {
      this.name = content
    },
    async registerSubmit () {
      const model = {
        name: this.name,
        username: this.username,
        password: this.password
      }
      const rulg = /^.{6,16}/
      if (
        rulg.test(this.name) &&
        rulg.test(this.username) &&
        rulg.test(this.password)
      ) {
        const res = await this.$http.post('/register', model)
        this.$msg.fail(res.data.msg)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000)
        /* ----------------------------------- */
      } else {
        this.$msg.fail('格式不正确')
      }
    }
  }
}
</script>

<style></style>
