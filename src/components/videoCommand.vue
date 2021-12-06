<template>
    <div
      class="video-n"
      @dblclick="fullScreen($event)">
      <span class="video-user">{{data.name}}</span>
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
          <li @click="isVoice">
            <img v-if="data.isVoice" class="ali-icon" src="../assets/images/omusic.png" alt="">
            <img v-else class="ali-icon" src="../assets/images/cmusic.png" alt="">
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
    /**
     * 双击全屏
     **/
    fullScreen (e) {
      if (e.target.tagName === 'VIDEO') {
        if (e.target.requestFullscreen) e.target.requestFullscreen()
        else if (e.target.webkitRequestFullScreen) e.target.webkitRequestFullScreen()
        else if (e.target.mozRequestFullScreen) e.target.mozRequestFullScreen()
      }
    },

    kick () {
      // 1.sip, 2.h323, 3.gb28181
      if (this.data.type === 1) {

      } else if (this.data.type === 2) {
        this.H323kick()
      }  else if (this.data.type === 3) {
        this.kickGB()
      } else {
        this.$parent.$parent.sendMsg('TR|' + this.data.userId)
      }
      // this.$parent.$parent.kickMember(this.data.userId)
    },

    /**
     * sip扬声器开关
     **/
    async sipMusice () {
      let id = this.data.name
      let status = this.data.isVoice ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_sip_gateway/set_loudspeaker_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isVoice', !this.data.isVoice)
    },

    /**
     * sip麦克风开关
     **/
    async sipSpeak () {
      let id = this.data.name
      let status = this.data.isSpeak ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_sip_gateway/set_microphone_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isSpeak', !this.data.isSpeak)
    },

    /**
     * H323扬声器开关
     **/
    async H323Musice () {
      let id = this.data.name
      let status = this.data.isVoice ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_h323_gateway/set_loudspeaker_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isVoice', !this.data.isVoice)
    },

    /**
     * H323麦克风开关
     **/
    async H323Speak () {
      let id = this.data.name
      let status = this.data.isSpeak ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_h323_gateway/set_microphone_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isSpeak', !this.data.isSpeak)
    },

    /**
     * H323离开会议
     **/
    async H323kick () {
      let id = this.data.name
      let status = this.data.isSpeak ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_h323_gateway/leave_room',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          channel_number: id
        }
      })
    },

    /**
     * GB28181扬声器开关
     **/
    async gbMusice () {
      let id = this.data.userId.split('@')[1]
      let status = this.data.isVoice ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_gb28181_gateway/set_loudspeaker_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isVoice', !this.data.isVoice)
    },

    /**
     * GB28181麦克风开关
     **/
    async gbSpeak () {
      let id = this.data.userId.split('@')[1]
      let status = this.data.isSpeak ? 0 : 1
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_gb28181_gateway/set_microphone_status',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          status,
        }
      })
      this.$parent.$parent.setUserInfo(this.data.userId, 'isSpeak', !this.data.isSpeak)
    },

    /**
     * GB28181离开会议
     */
    async kickGB () {
      let id = this.data.userId.split('@')[1]
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime)
      let res = await this.axios({
        method: 'post',
        url: this.$store.state.APIURL + '/youme_gb28181_gateway/leave_room',
        params: {
          appkey: this.$store.state.YM_APPKEY,
          curtime,
          checksum
        },
        data: {
          id,
          channel_number: id,
        }
      })
    },

    isSpeak () {
      if (this.data.type === 1) {
        this.sipSpeak()
      } else if (this.data.type === 2) {
        this.H323Speak()
      } else if (this.data.type === 3) {
        this.gbSpeak()
      } else {
        this.$parent.$parent.sendMsg('MKF|' + this.data.userId)
      }
    },

    isVoice () {
      console.log(this.data)
      if (this.data.type === 1) {
        this.sipMusice()
      } else if (this.data.type === 2) {
        this.H323Musice()
      } else if (this.data.type === 3) {
        this.gbMusice()
      }  else {
        this.$parent.$parent.sendMsg('JY|' + this.data.userId)
      }
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
