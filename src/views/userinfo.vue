<template>
  <div class="userinfo">
    <Navbar :user="model"></Navbar>
    <img src="../assets/bannerTop_new.png" class="backImg" />
    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
import Navbar from '../components/common/Navbar'
import userDetail from '../components/usercompoent/userDetail'
import userArticle from '../components/usercompoent/userArticle'
export default {
  data() {
    return {
      model: {}
    }
  },
  components: {
    Navbar,
    userDetail,
    userArticle
  },
  methods: {
    async userinfoData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  },
  created() {
    this.userinfoData()
  }
}
</script>

<style lang="less">
.userinfo {
  .backImg {
    height: 91px;
    width: 100%;
  }
}
</style>
