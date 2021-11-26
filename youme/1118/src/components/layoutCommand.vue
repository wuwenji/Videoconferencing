<template>
  <div class="layout">
    <ul>
      <li @click="newWindNum = item" :class="newWindNum == item ? 'active' : ''" v-for="item in windows" :key="item">
        <img :src="require('../assets/images/w' + item + '.png')" alt="">
      </li>
    </ul>
    <p>
      <el-button @click="changeWindNum" type="primary" size="mini">确定</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'layoutCommand',
  props: ['windowNumber'],
  data () {
    return {
      windows: [2, 3, 4, 5, 6],
      newWindNum: 0
    }
  },
  created () {
    this.newWindNum = this.windowNumber
  },
  methods: {
    changeWindNum () {
      // this.$parent.$parent.useLocal()
      // this.$emit('update:windowNumber', this.newWindNum)
      this.$parent.$parent.showDialog = false
      this.$parent.$parent.sendMsg('BJ|' + this.newWindNum)
      // this.$parent.$parent.useLocal()
    }
  }
}
</script>

<style scoped>
  .layout {
    padding: 20px;
    width: calc(100% - 40px);
    overflow: hidden;
  }

  ul {
    width: 100%;
    overflow: hidden;
  }

  ul li {
    list-style: none;
    float: left;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
  }

  ul li img {
    float: left;
  }

  ul li.active {
    background: #ddd;
  }

  .layout p {
    text-align: center;
    margin-top: 40px;
  }
</style>
