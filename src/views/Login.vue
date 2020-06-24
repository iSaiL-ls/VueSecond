<template>
  <div>
    <!-- 顶部 -->
    <login-top middleTop="登录bilibili">
      <div slot="right" style="font-size:3.611vw" @click="$router.push('/register')">去注册</div>
    </login-top>
    <!-- 输入框 -->
    <login-text
      label="账号"
      placeholder="请输入账号"
      style="margin:4.167vw 0;"
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
    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop.vue'
import LoginText from '../components/common/LoginText.vue'
import LoginBtn from '../components/common/LoginBtn.vue'

export default {
  // eslint-disable-next-line space-before-function-paren
  data () {
    return {
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
    async registerSubmit () {
      const model = {
        username: this.username,
        password: this.password
      }
      const rulg = /^.{6,16}/
      if (rulg.test(this.username) && rulg.test(this.password)) {
        const res = await this.$http.post('/login', model)
        this.$msg.fail(res.data.msg)
        /* ----------------------------------- */
        console.log(res)

        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.token)
        setTimeout(() => {
          this.$router.push('/userinfo')
        })
      } else {
        this.$msg.fail('格式不正确')
      }
    }
  }
}
</script>

<style></style>
