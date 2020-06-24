<template>
  <div class="home">
    <!-- 头部 -->
    <Nav-bar :user="model"></Nav-bar>

    <!-- 滚动导航 -->
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item, index) in category" :key="index" :title="item.title">
          <!-- 滚动加载更多 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="真的是一滴都没有了！！！"
            @load="onLoad"
            :immediate-check="false"
          >
            <div class="detailparent">
              <Detail
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem, categoryindex) in item.list"
                :key="categoryindex"
              ></Detail>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/common/Navbar'
import Detail from './Detail'
export default {
  data () {
    return {
      model: {},
      // 导航栏
      category: [],
      // 导航栏的下表
      active: 0
    }
  },
  methods: {
    // 请求用户消息
    async getUser () {
      if (localStorage.getItem('id')) {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.model = res.data[0]
      }
    },
    // 发送请求获取数据
    async selectCategory () {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
    },
    // 对数据改造
    changeCategory (data) {
      const category1 = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.finished = false
        item.loading = false
        item.pagesize = 10
        return item
      })
      this.category = category1
      this.selectArticle()
    },
    // 按分类获取数据
    async selectArticle () {
      const categoryItem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize
        }
      })
      categoryItem.list.push(...res.data)
      categoryItem.loading = false
      if (res.data.length < categoryItem.pagesize) categoryItem.finished = true
    },
    // 滚动加载数据结束时间
    onLoad () {
      const categoryitem = this.categoryItem()
      setTimeout(() => {
        categoryitem.page += 1
        this.selectArticle()
      }, 1000)
    },
    // 获取分类下标
    categoryItem () {
      const categoryItem = this.category[this.active]
      return categoryItem
    }
  },
  watch: {
    active () {
      const categoryitem = this.categoryItem()
      if (!categoryitem.list.length) {
        this.selectArticle()
      }
    }
  },
  components: {
    NavBar,
    Detail
  },
  created () {
    this.selectCategory()
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: white;
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
.categorytab {
  position: relative;
  .category-ico {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}
</style>
