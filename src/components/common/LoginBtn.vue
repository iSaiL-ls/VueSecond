<template>
  <div class="btnparent" @click="registerClisck">
    <div class="loginbtn">{{ btntext }}</div>
  </div>
</template>

<script>
export default {
  data () { return {} },
  props: ['btntext'],
  methods: {
    registerClisck () {
      this.$emit('registerSubmit')
    }
  }
}
</script>

<style>
.btnparent {
  margin: 4.167vw 2.778vw;
}
.loginbtn {
  height: 12.5vw;
  background-color: #ff9db5;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25vw;
  font-size: 6.25vw;
}
</style>
