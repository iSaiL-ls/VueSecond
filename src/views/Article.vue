<template>
  <div v-if="model">
    <!-- 头部 -->
    <Nav-bar :user="userModel"></Nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div class="onediv">
          <!-- 不知道什么原因的bug，根据网上提供消息做了判断 还是报错 -->
          <span v-if="model.category.title">{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div class="twodiv">
          <span>{{ model.userinfo.name }}</span>
          <span>157.8万次观看</span>
          <span>9836弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div class="threediv">
          <div @click="collectionClick" :class="{activeColor:collectionActive}">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div @click="subscriptClick" :class="{activeColor:subscritionActive}">
            <span class="icon-bubble"></span>
            <span>关注</span>
          </div>
          <div>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </div>
        </div>
      </div>
      <!-- 推荐文章 -->
      <div class="detailparent">
        <Detail
          class="detailitem"
          :detailitem="item"
          v-for="(item, index) in commendList"
          :key="index"
        ></Detail>
      </div>

      <!-- 评论部分 -->
      <comment-title
        :user="userModel"
        :datalength="length"
        @Postcoment="postSucess"
        ref="commentcomipt"
      ></comment-title>
      <comment @lenthselect="len" @puublishClick="PostChildClick" ref="commentPulish"></comment>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/common/Navbar'
import Detail from './Detail'
import commentTitle from '../components/article/commentTitle'
import comment from '../components/article/comment'

export default {
  data () {
    return {
      // 用户信息
      userModel: {},
      // 当前文章信息
      model: null,
      // 推荐文章
      commendList: null,
      // 有多少文章
      length: null,
      // 评论数据
      Postcom: {
        content_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      // 是否收藏
      collectionActive: null,
      // 关注
      subscritionActive: null
    }
  },
  components: {
    NavBar,
    Detail,
    commentTitle,
    comment
  },
  methods: {
    // 关注
    async subscriptClick () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), { sub_id: this.model.userid })
        console.log(res)

        if (res.data.msg === '关注成功') {
          this.$msg.fail(res.data.msg)
          this.subscritionActive = true
        } else {
          this.$msg.fail('取消关注')
          this.subscritionActive = false
        }
      } else {
        this.$router.push('/login')
      }
    },
    // 收藏
    async collectionClick () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'), { article_id: this.$route.params.id })
        if (res.data.msg === '收藏成功') {
          this.$msg.fail(res.data.msg)
          this.collectionActive = true
        } else {
          this.$msg.fail('取消收藏')
          this.collectionActive = false
        }
      } else {
        this.$router.push('/login')
      }
    },
    // 进入页面是否关注
    async subscriptionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.model.userid
          }
        })
        // console.log(res)
        this.subscritionActive = res.data.success
      }
    },
    // 进入页面获取是否收藏
    async collectionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        this.collectionActive = res.data.success
      }
    },
    // 回复评论
    PostChildClick (id) {
      this.Postcom.parent_id = id
      this.$refs.commentcomipt.focusIpt()
    },
    // 发送评论
    async postSucess (res) {
      // 获取时间
      const date = new Date()
      var m = date.getMonth() + 1
      var d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      var str = m + '-' + d
      this.Postcom.article_id = this.$route.params.id
      this.Postcom.comment_date = str
      this.Postcom.content_content = res
      const result = await this.$http.post(
        '/comment_post/' + localStorage.getItem('id'),
        this.Postcom
      )
      // 打印返回数据，
      console.log(result)
      if (result.status === 200) {
        this.$msg.fail('评论成功')
      } else {
        this.$msg.fail('发送失败')
      }
      this.$refs.commentPulish.commentData()
      this.Postcom.parent_id = ''
    },
    // 倒手多少条评论
    len (len) {
      this.length = len
    },
    // 获取当前用户信息
    async myUser () {
      if (localStorage.getItem('id')) {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.userModel = res.data[0]
      }
    },
    // 获取当前文章的消息
    async articleitemData () {
      // 通过路由拿到当前文章的id
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.model = res.data[0]
      this.subscriptionInit()
    },
    // 获取推荐文章的数据
    async commendData () {
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    }
  },
  created () {
    this.myUser()
    this.articleitemData()
    this.commendData()
    this.collectionInit()
  },
  watch: {
    $route () {
      this.myUser()
      this.articleitemData()
      this.commendData()
      // 刷新页面
      // this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.detailinfo {
  background-color: #fff;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfoText {
  padding: 2.767vw;
  // div:nth-child(1)
  .onediv {
    padding: 2.378vw 2.778vw;
    span:nth-child(1) {
      background-color: #f4f4f4;
      border-radius: 1.944vw;
      color: #fb7299;
      font-size: 13px;
      padding-right: 0 2.778vw;
    }
    span:nth-child(2) {
      padding: 0 10px;
    }
  }
  // div:nth-child(2)
  .twodiv {
    padding: 1.778vw 2.778vw;
    span {
      color: #ccc;
      font-size: 3.333vw;
    }
    span:nth-child(1) {
      color: #999;
      font-size: 14px;
      padding-right: 2.778vw;
    }
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      padding-right: 8px;
      font-size: 13px;
    }
  }
  .threediv {
    padding: 0 10px;
    display: flex;
    div {
      margin-right: 15px;
      display: flex;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        font-size: 17px;
        padding-right: 3px;
      }
      span:nth-chidl(2) {
        font-size: 12px;
      }
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 5px;
  .detailitem {
    padding: 0 8px;
    display: flex;
    margin: 1.389vw 0;
    width: 45%;
  }
}
.activeColor {
  color: #fb7299 !important;
}
</style>
