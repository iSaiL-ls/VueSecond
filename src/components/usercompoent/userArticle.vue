<template>
  <div class="fu">
    <div class="parent">
      <div class="card">
        <span class="shu">动态</span>
        <span>视频</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.fu {
  margin: 0;
  padding: 0;
}
.parent {
  display: flex;
  background-color: #fff;
  align-items: center;
  height: 11.111vw;

  .card {
    margin: 0;
    display: flex;
    align-items: center;
    padding-left: 2.778vw;
    span {
      padding: 0 2.778vw;
      color: #999;
    }
    .shu {
      border-right: 0.278vw solid #999;
    }
  }
}
</style>
