<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom:2.778vw;">
      <Nav-bar :user="model"></Nav-bar>
    </div>
    <!-- 头像上传 -->
    <div class="uploadfile">
      <van-uploader
        class="uploadimg"
        preview-size="100vw"
        :after-read="afterRead"
      />
      <edit-banner left="头像">
        <img :src="model.user_img" slot="right" v-if="model.user_img" />
        <img src="../assets/default_img.jpg" alt slot="right" v-else />
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="nameShow">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </edit-banner>

    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{
        model.gender == 1 ? '男' : '女'
      }}</a>
    </edit-banner>
    <edit-banner left="个签" @bannerClick="textShow">
      <a href="javascript:;" slot="right">{{ model.user_desc }}</a>
    </edit-banner>

    <div class="editback" @click="$router.back()">返回上一页</div>

    <!-- 修改姓名的弹出框 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="cotent = ''"
    >
      <van-field v-model="cotent" autofocus />
    </van-dialog>
    <!-- 个签的弹出框 -->
    <van-dialog
      v-model="textshow"
      title="个签"
      show-cancel-button
      @confirm="textConfirmClick"
    >
      <van-field
        v-model="cotent"
        type="textarea"
        autofocus
        style="color:#aaa"
      />
    </van-dialog>
    <!-- 编辑性别 -->
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import NavBar from '../components/common/Navbar'
import editBanner from '../components/common/editBanner'
export default {
  data() {
    return {
      model: {},
      // 控制昵称弹出框的显示与隐藏
      show: false,
      // 弹出框的内容
      cotent: '',
      // 控制个签弹出框的显示与隐藏
      textshow: false,
      // 控制性别显示的弹出框
      gendershow: false,
      actions: [
        { name: '男', val: 1 },
        { name: '女', val: 0 }
      ]
    }
  },
  components: {
    NavBar,
    editBanner
  },
  methods: {
    // 数据渲染
    async selectUser() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async afterRead(file) {
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      const res = await this.$http.post('/upload', fromdata)
      this.model.user_img = res.data.url
      this.userUpdatae()
    },
    // 上传头像
    async userUpdatae() {
      const res = await this.$http.post(
        '/update/' + localStorage.getItem('id'),
        this.model
      )
      this.$msg.fail(res.request.statusText)
    },
    // 姓名点击确认
    confirmClick() {
      this.model.name = this.cotent
      this.userUpdatae()
      this.cotent = ''
    },
    // 个签点击确认
    textConfirmClick() {
      this.model.user_desc = this.cotent
      this.userUpdatae()
      this.cotent = ''
    },
    // 点击姓名修改时
    async nameShow() {
      this.show = true
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.cotent = res.data[0].name
    },
    // 点击个签修改时
    async textShow() {
      this.textshow = true
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.cotent = res.data[0].user_desc
    },
    // 修改性别
    onSelect(data) {
      this.model.gender = data.val
      this.gendershow = false
      this.userUpdatae()
    }
  },
  created() {
    this.selectUser()
  }
}
</script>

<style lang="less">
.editViews a {
  color: #999;
}
.editViews img {
  height: 46px;
  width: 46px;
  border-radius: 50%;
}
.uploadfile {
  position: relative;
  overflow: hidden;
  .uploadimg {
    opacity: 0;
    position: absolute;
  }
}
.editback {
  margin-top: 5.556vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  color: #999;
  padding: 4.167vw 0;
  font-size: 4vw;
}
</style>
