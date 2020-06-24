<template>
  <div @click="pathPush">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt style="width:100%;height:100%;" />
        <div class="bottom">
          <span class="video icon-play2"> 77</span>
          <span class="comment icon-file-text">
            {{ !detailitem.commentlen ? 99 : detailitem.commentlen }}
          </span>
        </div>
      </div>
      <p>{{ detailitem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailitem'],
  methods: {
    pathPush() {
      if (this.$route.path !== `/article/${this.detailitem.id}`) {
        this.$router.push(`/article/${this.detailitem.id}`)
      } else {
        this.$msg.fail('已经再看了！')
      }
    }
  }
}
</script>

<style lang="less">
.detailItem {
  p {
    font-size: 3.333vw;
  }
}
.imgparent {
  // box-shadow: 200px 200px 200px 200px rgba(0, 0, 0, 0.3) inset;
  position: relative;
  .video {
    position: absolute;
    left: 5%;
    bottom: 7%;
    font-size: 3.611vw;
  }
  .comment {
    position: absolute;
    right: 5%;
    bottom: 7%;
    font-size: 3.611vw;
  }
}
</style>
