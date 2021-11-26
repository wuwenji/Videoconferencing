<template>
  <div>
    <transition name="el-zoom-in-bottom">
    <el-button
      @click="windowHide = false;newInfo = false"
      :class="['show', newInfo ? 'new-info' : '']"
      v-if="windowHide"
      type="primary">
      聊天室
    </el-button>
    <div v-else class="window">
      <div class="title">
        {{ roomId }}
        <span @click="windowHide = true">-</span>
      </div>
      <div ref="infoWindows" class="info">
        <ul>
          <li :class="item.senderId == userId ? 'msg-right' : ''" v-for="(item, key) in texts"
              :key="key">
            <div class="text-img">
              <img src="../assets/images/user_icon.png" alt="">
            </div>
            <div class="text-info">
              <p class="name">{{ item.senderId }} {{ getTime(item.time) }}</p>
              <p class="bubble chat-arrow content">{{ item.message.__content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="input">
        <input v-model="tidings" @keyup.enter="sendText"/>
        <button @click="sendText">发送</button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import YIM from 'youme-im/core'
import TextMessage from 'youme-im/text'
import VoiceMessage from 'youme-im/voice'
import AmrRecorder from 'youme-im/voice/amr'
import WechatRecorder from 'youme-im/voice/wechat'
import { MessageObject } from 'youme-im/core'

export default {
  name: 'imCommand',
  props: ['userId', 'roomId'],
  data () {
    return {
      yim: null,
      windowHide: true,
      newInfo: false,
      texts: [],
      tidings: '',
      token: ''
    }
  },
  created () {
    this.addUser(this.userId)
  },
  methods: {
    /**
     * 初始化IM
     */
    initYIM () {
      console.log('=========加入IM=========')
      this.yim = new YIM({
        appKey: this.$store.state.YM_APPKEY,
        useMessageType: [ TextMessage, VoiceMessage ]
      })

      this.yim.login(this.userId, this.token).catch((e) => {
        alert('登录失败：' + e.name)
      })

      this.yim.joinRoom(this.roomId).catch((e) => {
        alert('加入房间失败：' + e.name)
      })

      // 事件绑定：发送/接收了消息
      this.yim.on('message:*', (eventName, msg) => {
        if (msg.receiverId == this.roomId) {
          this.texts.push(msg)
          if (this.windowHide) {
            this.newInfo = true
          }
        }
      })
    },

    getTime (date) {
      let _date = new Date(date)
      let hh = _date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours()
      let mm = _date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes()
      let ss = _date.getSeconds() < 10 ? '0' + _date.getSeconds() : _date.getSeconds()
      return hh + ':' + mm + ':' + ss
    },

    /**
     * 退出登录
     **/
    logout () {
      this.yim.logout()
      console.log('=========退出IM=========')
    },

    /**
     * 退出房间
     **/
    // leaveRoom () {
    //   this.yim.leaveRoom(this.roomId).catch((e) => {
    //     alert('退出房间失败：' + e.name)
    //   })
    // },

    /**
     * 发送消息
     */
    sendText () {
      let msg = new TextMessage(this.tidings)
      this.yim.sendToRoom(this.roomId, msg)
      this.tidings = ''
    },

    /**
     * 添加youme账号
     */
    addUser (userName) {
      let curtime = Math.floor(Date.now() / 1000)
      let checksum = this.$store.getters.getChecksum(curtime, 1)
      this.axios({
        method: 'post',
        url: '/api/add_user_auth',
        params: {
          "appkey": this.$store.state.YM_APPKEY,
          "identifier": 'admin',
          curtime,
          checksum
        },
        data: {
          UserList: [{
            "UserID": userName,
            "NickName": 'userName' + 123
          }]
        }
      }).then((result) => {
        let data = result.data
        if (data.ActionStatus === 'OK') {
          this.token = data.UserList[0].Token
          this.initYIM()
        }
      })
    }
  },
  beforeDestroy () {
    this.logout()
  },
  updated () {
    // 滚动条放到最后
    let wind = this.$refs.infoWindows
    wind.scrollTop = wind.scrollHeight
  }
}
</script>

<style scoped>
  .show {
    position: absolute;
    right: 0;
    bottom: 0;
    padding-left: 30px;
    padding-right: 30px;
    z-index: 9999;
  }

  .window {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99999;
    width: 350px;
    height: 400px;
    background: #f0f0f0;
    border: 1px solid #fff;
    border-radius: 4px;
    overflow: hidden;
    text-align: left;
  }

  .title {
    color: #666;
    border-bottom: 1px solid #DCDFE6;
  }

  .title span {
    float: right;
    cursor: pointer;
    margin-right: 10px;
    font-size: 30px;
    margin-top: -4px;
  }

  .title span:hover {
    color: #333;
  }

  .input {
    height: 35px;
    padding: 5px;
    background: #fff;
  }

  .input input {
    float: left;
    width: calc(100% - 80px);
    border: 1px solid #DCDFE6;
    background: #fff;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
  }

  .info {
    height: calc(100% - 78px);
    overflow-y: auto;
    color: #666;
    padding: 0 3px
  }

  .text-img {
    left: 0;
    top: 0;
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    overflow: hidden;
    float: left;
    margin-top: 10px;
    margin-right: 5px;
  }

  .text-info {
    width: calc(100% - 45px);
    float: left;
  }

  .text-img img {
    width: 100%;
  }

  .msg-right .text-img {
    float: right;
  }

  .msg-right .text-info {
    float: right;
  }

  .info .name {
    font-size: 12px;
    line-height: 18px;
    padding: 0 2px;
    color: #999;
  }

  .input button {
    border: 1px solid #DCDFE6;
    background: none;
    height: 32px;
    line-height: 32px;
    padding: 0 17px;
    margin-left: 5px;
    cursor: pointer;
    background: #f0f0f0;
  }

  .info ul li {
    list-style: none;
    clear: both;
  }

  .bubble {
    position: relative;
    float: left;
    background: #fff;
    border: 1px solid #ccc;
    color: #333;
    font-size: 14px;
    /*height: 24px;*/
    line-height: 24px;
    border-radius: 5px;
    padding: 2px 10px;
    word-break: break-all;
    vertical-align: top;
    margin: 5px 0 20px 10px;
  }

  .msg-right .name {
    text-align: right;
  }

  .msg-right .bubble {
    float: right;
    background: #b2e281;
    border: 1px solid #a4d176;
    margin-right: 10px;
  }

  .msg-right .chat-arrow::after, .msg-right .chat-arrow::before {
    border-color: transparent transparent transparent #b2e281;
    left: auto;
    right: -10px;
  }

  .chat-arrow::before {
    border-color: transparent #ccc transparent transparent;
    left: -11px;
  }

  .chat-arrow::after, .chat-arrow::before {
    content: "\200B";
    height: 0;
    border: 5px solid;
    border-top-color: currentcolor;
    border-right-color: currentcolor;
    border-bottom-color: currentcolor;
    border-left-color: currentcolor;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: -10px;
    top: 9px;
  }

</style>
