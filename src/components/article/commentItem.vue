<template>
  <div class="commpentitems">
    <div class="commentItem" v-for="(item, index) in commentchild" :key="index">
      <div class="userImg" v-if="item.userinfo">
        <img :src="item.userinfo.user_img" alt v-if="item.userinfo.user_img" />
        <img src="../../assets/default_img.jpg" alt v-else />
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>此用户无姓名</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="commentContent">
        <!--  远吗 -->
        <!-- <div v-if="!temp">
          {{ item.comment_content }}
          <span class="publish" @click="PostItemcomment(item.comment_id)"
            >回复</span
          >
        </div>-->

        <div v-if="!temp">
          {{ item.comment_content }}
          <span
            class="publish"
            @click="PostItemcomment(item.comment_id)"
          >回复</span>
        </div>

        <div v-else>
          回复:
          <span style="color:#478ef0">@{{ item.parent_user_info.name }}:</span>
          {{ item.comment_content }}
          <span
            class="publish"
            @click="PostItemcomment(item.comment_id)"
          >回复</span>
        </div>
      </div>
      <commentchild-item :commentchild="item.child" :temp="true" @postChild="postChild"></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentchildItem',
  props: ['commentchild', 'temp'],
  methods: {
    PostItemcomment (id) {
      this.$emit('postChild', id)
      this.$emit('PostPublish', id)
    },
    postChild (id) {
      this.PostItemcomment(id)
      // 是不是应该做个判断是否到达了最上面
      this.$emit('PostPublish', id)
    }
  }
}
</script>

<style lang="less" scoped>
// .commpentitems {
//   padding: 0 40px;
// }
// .commentItem {
//   display: flex;
//   padding: 4.167vw 0;
//   flex-direction: column;
//   .userImg {
//     margin-right: 2.778vw;
//     img {
//       width: 9.722vw;
//       height: 9.722vw;
//       border-radius: 50%;
//     }
//   }
//   .commentContent {
//     flex: 1;
//     p {
//       font-size: 3.611vw;
//       color: #555;
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 4.167vw;
//     }
//     div {
//       font-size: 3.611vw;
//     }
//   }
// }

.commpentitems {
  .commentItem {
    display: flex;
    flex-direction: column;
    .userImg {
      display: flex;
      img {
        margin: 0 2.222vw 2.778vw 0;
      }
      p {
        flex: 1;
        font-size: 3.611vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 4.167vw;
        padding-right: 1.389vw;
        // span:nth-child(1) {
        //   // padding-top: 1.389vw;
        // }
      }
    }
  }
}
.commentContent {
  margin-left: 12.5vw;
  position: relative;
  .publish {
    position: absolute;
    top: -25px;
    right: 6.389vw;
    color: red;
  }
}
</style>
