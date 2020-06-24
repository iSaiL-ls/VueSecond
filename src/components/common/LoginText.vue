<template>
  <div>
    <van-field
      :label="label"
      :type="type"
      :placeholder="placeholder"
      v-model="content"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  props: ['label', 'type', 'placeholder', 'rule'],
  methods: {
    handlerulg () {
      // RegExp方法能够将正则字符串转换位正则表达式
      // const rue = new RegExp(this.rule)if (rue.test(this.content))
      if (this.content) {
        this.$emit('inputChange', this.content)
      }
    }
  },
  watch: {
    content () {
      this.handlerulg()
    }
  }
}
</script>

<style></style>
