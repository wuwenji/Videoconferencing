<template>
    <div class="video-n">
      <span class="video-user">{{data.userId}}</span>
      <span @click="kick" class="close">
        <svg t="1636007586836" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2436" width="25" height="25"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#5090F1" p-id="2437"></path><path d="M311.585735 246.935972m6.464976 6.464977l452.54834 452.54834q6.464976 6.464976 0 12.929952l-51.71981 51.71981q-6.464976 6.464976-12.929952 0l-452.54834-452.54834q-6.464976-6.464976 0-12.929952l51.71981-51.71981q6.464976-6.464976 12.929952 0Z" fill="#FFFFFF" p-id="2438"></path><path d="M712.414265 246.935972m6.464976 6.464977l51.71981 51.71981q6.464976 6.464976 0 12.929952l-452.54834 452.54834q-6.464976 6.464976-12.929952 0l-51.71981-51.71981q-6.464976-6.464976 0-12.929952l452.54834-452.54834q6.464976-6.464976 12.929952 0Z" fill="#FFFFFF" p-id="2439"></path></svg>
      </span>
      <slot></slot>
      <div class="btns">
        <ul>
          <li @click="isSpeak">
            <img v-if="data.isSpeak" class="ali-icon" src="../assets/images/ovoice.png" alt="">
            <img v-else  class="ali-icon" src="../assets/images/cvoice.png" alt="">
          </li>
          <li @click="isCamera">
            <img v-if="data.isCamera" class="ali-icon" src="../assets/images/ovideo.png" alt="">
            <img v-else class="ali-icon" src="../assets/images/cvideo.png" alt="">
          </li>
        </ul>

      </div>
    </div>
</template>

<script>
export default {
  name: 'videoCommand',
  props: ['data'],
  methods: {
    kick () {
      this.$parent.$parent.sendMsg('TR|' + this.data.userId)
      // this.$parent.$parent.kickMember(this.data.userId)
    },
    isSpeak () {
      this.$parent.$parent.sendMsg('MKF|' + this.data.userId)
    },
    isCamera () {
      this.$parent.$parent.sendMsg('SP|' + this.data.userId)
    }
  }
}
</script>

<style scoped>
  .video-n {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0px;
    top: 0px;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }

  .btns {
    height: 40px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  ul {
    float: right;
    margin-top: 5px;
    margin-right: 10px;
  }

  ul li {
    float: left;
    list-style: none;
    margin: 5px 7px;
    cursor: pointer;
  }
</style>
