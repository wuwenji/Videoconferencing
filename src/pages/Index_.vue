<template>
  <div id="index">
    <div class="phone-login" v-if="phoneShow">
      <div class="phone-from">
        <el-input type="text" v-model="USERID" placeholder="请输入您的名字"/>
        <el-button type="primary" @click="phoneLogin">登录</el-button>
      </div>
    </div>
    <div :class="['left', showLeft ? 'to-right' : 'to-left']">
      <img @click="showAside" class="hide" v-if="showLeft" src="../assets/images/hidd.png" alt="">
      <img @click="showAside" class="hide" v-else src="../assets/images/show.png" alt="">
      <div class="title">成员列表</div>
      <el-input
        size="mini"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="personals"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
        <div class="custom-tree-node" slot-scope="{ node, data }" @dblclick="addMemeber(data)">
            <span
              draggable="true"
              @dragend="dragend($event)"
              @dragstart="drag($event, data)">
                <svg v-if="!data.children" t="1635233417601" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4158" width="20" height="20"><path d="M0 511.687111C0 236.544 229.262222 13.511111 512 13.511111S1024 236.544 1024 511.715556c0 275.114667-229.262222 498.147556-512 498.147555S0 786.801778 0 511.715556z m526.222222 173.653333c106.097778 0 180.224 34.929778 226.076445 66.816 13.454222 9.671111 31.061333 11.320889 46.08 4.295112a45.966222 45.966222 0 0 0 6.200889-79.843556C745.813333 635.733333 653.710222 593.351111 526.222222 593.351111c-127.488 0-219.591111 42.296889-278.357333 83.228445a46.023111 46.023111 0 0 0 6.200889 79.843555 45.767111 45.767111 0 0 0 46.08-4.295111c45.909333-31.857778 120.035556-66.844444 226.076444-66.844444z m0-229.888a91.847111 91.847111 0 0 1-91.704889-91.960888A91.847111 91.847111 0 0 1 526.222222 271.530667a91.847111 91.847111 0 0 1 91.704889 91.960889 91.847111 91.847111 0 0 1-91.704889 91.960888z m-183.438222-91.960888c0 101.546667 82.119111 183.921778 183.438222 183.921777s183.438222-82.346667 183.438222-183.921777-82.119111-183.921778-183.438222-183.921778-183.438222 82.346667-183.438222 183.921778z" p-id="4159" fill="#3287d8"></path></svg>
                {{ data.name }}
            </span>
        </div>
      </el-tree>
      <div v-if="!isRoom" class="add-room" @click="showBottom">
        <span>+</span>
        <p>新建房间</p>
      </div>
      <div v-else class="add-room" @click="outRoom">
        <span><svg t="1634201295333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2439" width="25" height="25"><path d="M689.664 172.992l0 133.781333c89.28 58.176 148.394667 158.698667 148.394667 273.216 0 180.032-145.984 325.994667-326.058667 325.994667-180.032 0-326.016-145.962667-326.016-325.994667 0-101.781333 46.634667-192.618667 119.722667-252.437333L305.706667 186.773333C164.373333 261.098667 67.968 409.216 67.968 579.946667 67.968 825.173333 266.794667 1024 512.042667 1024c245.205333 0 443.989333-198.826667 443.989333-444.053333C956.010667 397.888 846.464 241.536 689.664 172.992z" p-id="2440" fill="#2e87db"></path><path d="M577.344 459.989333c0 28.693333-29.248 51.989333-65.344 51.989333l0 0c-36.053333 0-65.322667-23.274667-65.322667-51.989333L446.677333 51.989333C446.677333 23.274667 475.946667 0 512 0l0 0c36.096 0 65.344 23.274667 65.344 51.989333L577.344 459.989333z" p-id="2441" fill="#2e87db"></path></svg></span>
        <p>退出房间</p>
      </div>
      <div class="aside">
      </div>
    </div>
    <div :class="['right', showLeft ? 'min-width': 'max-width']">
      <div class="header">
        <h2>视频会议</h2>
        <div class="phone">
          <button v-if="isLogin" @click="outLogin">退出</button>
          <template v-else>
            <input class="user-name" type="text" v-model="USERID">
            <button @click="login">登录</button>
          </template>
        </div>

      </div>
      <div v-if="isRoom" class="video">
        <div v-if="windowNumber < 3" class="video-type">
          <TwoWindows ref="videoGroup" :group="memberIds" :dragData="dragData"/>
        </div>
        <div v-if="windowNumber == 3" class="video-type">
          <ThreeWindows ref="videoGroup" :group="memberIds" :dragData="dragData"/>
        </div>
        <div v-if="windowNumber == 4" class="video-type">
          <FourWindows class="video-table-2" ref="videoGroup" :group="memberIds" :dragData="dragData"/>
        </div>
        <div v-if="windowNumber == 5" class="video-type">
          <FiveWindows class="video-table-2" ref="videoGroup" :group="memberIds" :dragData="dragData"/>
        </div>
        <div v-if="windowNumber > 5" class="video-type">
          <SixWindows class="video-table-2" ref="videoGroup" :group="memberIds" :dragData="dragData"/>
        </div>
      </div>
      <div v-else class="video">
        <div class="join-room">
          <input type="text" v-model="roomId" placeholder="请输入房间号">
          <button @click="enterJoin(roomId)">进入</button>
        </div>
      </div>
      <div v-if="isRoom" class="right-b">
        <ul class="menu">
          <li @click="speakSwitch(USERID)">
            <img v-if="getUserInfo().isSpeak" class="ali-icon" src="../assets/images/ovoice.png" alt="">
            <img v-else class="ali-icon" src="../assets/images/cvoice.png" alt="">
          </li>
          <!--<li @click="videoSwitch">-->
            <!--<img v-if="getUserInfo().isCamera" class="ali-icon" src="../assets/images/omusic.png" alt="">-->
            <!--<img v-else class="ali-icon" src="../assets/images/cmusic.png" alt="">-->
          <!--</li>-->
          <li @click="vOrs">
            <img v-if="gxScreen" class="ali-icon" style="position: relative;top: 1px;" src="../assets/images/cmonitor.png" alt="">
            <img v-else class="ali-icon" style="position: relative;top: 1px;" src="../assets/images/monitor.png" alt="">
          </li>
          <li @mouseover="showQrCode = true" @mouseout="showQrCode = false">
            <div class="qr" v-if="showQrCode">
              <QrCode :roomId="roomId"/>
            </div>
            <img class="ali-icon" style="position: relative;top: 1px;" src="../assets/images/qrcode.png" alt="">
          </li>
          <li @click="showDialog = true">
            <img class="ali-icon" src="../assets/images/layout.png" alt="">
          </li>
        </ul>
        <ImCommand
          :roomId="roomId"
          :userId="USERID"/>
      </div>
    </div>
    <transition name="el-zoom-in-bottom">
      <div v-if="isBottom" class="bottom">
        <span @click="isBottom = false" class="close">x</span>
        <div class="new-room">
          <div class="new-room-item">
            房间号：<el-input size="mini" v-model="newRoomId" type="text"></el-input>
          </div>
          <div class="new-room-item">
            窗口数：<el-select size="mini" v-model="windowNumber" name="">
            <el-option :value="2">2</el-option>
            <el-option :value="4">4</el-option>
            <el-option :value="6">6</el-option>
          </el-select>
          </div>
          <div class="new-room-item">
            <el-button size="mini" @click="newRoom">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
    <el-dialog
      title="布局"
      width="455px"
      :visible.sync="showDialog">
      <LayoutCommand :windowNumber.sync="windowNumber"/>
    </el-dialog>
  </div>
</template>

<script>
  import TwoWindows from '../components/windows/twoWindows'
  import ThreeWindows from '../components/windows/threeWindows'
  import FourWindows from '../components/windows/fourWindows'
  import FiveWindows from '../components/windows/fiveWindows'
  import SixWindows from '../components/windows/sixWindows'
  import LayoutCommand from '../components/layoutCommand'
  import ImCommand from '../components/imCommand'
  import QrCode from '../components/qrCode'
  export default {
    name: 'Index',
    data () {
      return {
        isVAN: false,
        mesg: null,
        allVoice: true,
        phoneShow: true,
        showQrCode: false,
        showDialog: false,
        YM_APPKEY: this.$store.state.YM_APPKEY,
        APPSECRET: this.$store.state.APPSECRET,
        APPID: this.$store.state.APPID,
        showLeft: true,
        gxScreen: false,
        isFristLogin: true,
        isBottom: false,
        isLogin: false,
        isRoom: false,
        APIKEY: this.$store.state.APIKEY,
        roomId: '123458',
        USERID: 'user1',
        rtc: null,
        newRoomId: '123458',
        windowNumber: '2',
        showMenu: 0,
        memberIds: [],
        dragData: '',
        defaultProps: {
          children: 'children',
          label: 'userId'
        },
        filterText: '',
        personals: [
          {
            id: 1,
            name: '测试组',
            children: [
              {
                name: 'ceshi29',
                userId: 'sip:ceshi29@101.251.216.141',
                type: 1,
                isSpeak: true,
                isCamera: true,
                isVoice: true
              },
              {
                name: 'testWu',
                userId: 'h323:testWu',
                ip: '192.168.1.124',
                type: 2,
                isSpeak: true,
                isCamera: true,
                isVoice: true
              },
              {
                name: 'gb28181',
                userId: 'gb28181:34020000001310000005@34020000001310000005',
                type: 3,
                isSpeak: true,
                isCamera: true,
                isVoice: true
              }
            ]}
        ]
      }
    },
    created () {
      this.initYMRTC()
      // this.login()
    },
    methods: {
      phoneLogin () {
        this.login()
        let url = window.location.href.split('?=')
        this.roomId = url[1]
        this.phoneShow = false
        // this.enterJoin(this.roomId)
      },
      /**
       * 互换位置
       **/
      swapArr (index1, index2) {
        this.memberIds[index1] = this.memberIds.splice(index2, 1, this.memberIds[index1])[0]
        this.getStream(index1)
        this.getStream(index2)
      },
      /**
       * 获取单个stream
       **/
      getStream (index) {
        let userId = this.memberIds[index].userId
        if (userId == this.USERID) {
          this.rtc.stopLocalMedia()
          this.rtc
            .startLocalMedia({
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 }
              },
              audio: true
            })
        } else {
          this.rtc.requestUserStream(userId).then((stream) => {
            this.$refs.videoGroup.playVideo(userId, stream)
          })
          if (userId.indexOf('gx') > -1) {
            let id = userId.replace('gx', '')
            this.rtc.requestShareStream(id).then((stream) => {
              this.$refs.videoGroup.playVideo(userId, stream)
            })
          }
        }
      },

      /*
      * 退出重新绑定流
      **/

      kictStream (userId) {
        let index = this.memberIds.length - 1
        this.memberIds.map((item, key) => {
          if (item.userId == userId) {
            index = key
            this.memberIds.splice(key, 1)
            this.$message({
              type: 'warning',
              message: item.name + '退出房间',
              duration: 2000
            })
          }
        })
        this.getStreams(index)
      },

      getStreams (index) {
        this.memberIds.map((item, key) => {
          if (key >= index) {
            this.getStream(key)
          }
        })
      },


      /**
       * 获取登录者信息
       **/
      getUserInfo () {
        let info = {
          isVoice: true,
          isSpeak: true
        }
        this.memberIds.map(item => {
          if (item.userId == this.USERID) {
            info = item
          }
        })

        return info
      },

      /**
       * 更改信息
       **/
      setUserInfo (userId, object, value) {
        this.memberIds.map(item => {
          if (item.userId == userId) {
            item[object] = value
          }
        })
        this.$forceUpdate()
      },

      /**
       * 发消息
       **/
      async sendMsg (msg, memberId = '') {
        let curtime = Math.floor(Date.now() / 1000)
        let checksum = this.$store.getters.getChecksum(curtime, 1)
        let res = await this.axios({
          method: 'post',
          url: '/im/push_mcu_msg',
          params: {
            "appkey": this.YM_APPKEY,
            "identifier": 'admin',
            curtime,
            checksum
          },
          data: {
            "meeting_id": this.roomId,
            "user_id": "admin",
            "receiver_id": memberId,
            "content": msg
          }
        }).then((result) => {
          console.log(result)
        })
      },

      vOrs () {
        this.gxScreen = !this.gxScreen
        let s = this.rtc.getScreenMediaStatus()
        if (s === 'stop' || s === 'failed') {
          this.rtc.startScreenMedia({ video: true, audio: true })
        } else {
          this.rtc.stopScreenMedia()
          this.sendMsg('DGX|' + this.USERID)
        }
        // this.useLocal()
        // this.changeVideo = true
      },

      /**
       * 获取屏幕数据流
       **/
      getScreen (memberId, roomId) {
        this.memberIds.push({
          name: memberId + '屏幕',
          userId: memberId + 'gx',
          isSpeak: true,
          isCamera: true,
          isVoice: true
        })
        if (this.memberIds.length > this.windowNumber) {
          this.windowNumber++
          this.getMemberSteam()
        } else {
          this.rtc.requestShareStream(memberId).then((stream) => {
            this.$refs.videoGroup.playVideo(memberId + 'gx', stream)
          })
        }

      },

      /**
       * 麦克风开关
       **/
      speakSwitch (id) {
        this.memberIds.map(item => {
          if (item.userId === id) {
            console.log('禁止' + id + '说话：' + !item.isSpeak)
            this.rtc.setMute(id, !item.isSpeak)
            this.$refs.videoGroup.isMusic(id, item.isSpeak)
            this.setUserInfo(id, 'isSpeak', !item.isSpeak)
          }
        })
      },
      showAside () {
        this.showLeft = !this.showLeft
      },

      /**
       * SIP呼叫
       */
      async callPersonal (id) {
        // 34020000001320000077
        let curtime = Math.floor(Date.now() / 1000);
        let checksum = this.$store.getters.getChecksum(curtime)
        let res = await this.axios({
          method: 'post',
          url: this.$store.state.APIURL + '/youme_sip_gateway/reg_sip_user',
          params: {
            appkey: this.YM_APPKEY,
            curtime,
            checksum
          },
          data: {
            channel_id: this.roomId,
            user_id: id,
          }
        }).then((result) => {
          console.log(result)
        })
        console.log(res)

        let resCall = await this.axios({
          method: 'post',
          url: this.$store.state.APIURL + '/youme_sip_gateway/call_sip_user',
          params: {
            appkey: this.YM_APPKEY,
            curtime,
            checksum
          },
          data: {
            channel_id: this.roomId,
            user_id: id,
          }
        })

        console.log(resCall)
      },

      /**
       * H.323 呼叫
       */
      async HcallPersonal (name, ip) {
        // 34020000001310000001
        let curtime = Math.floor(Date.now() / 1000);
        let checksum = this.$store.getters.getChecksum(curtime)

        let resCall = await this.axios({
          method: 'post',
          url: this.$store.state.APIURL + '/youme_h323_gateway/join_room',
          params: {
            appkey: this.YM_APPKEY,
            curtime,
            checksum
          },
          data: {
            channel_id: this.roomId,
            number: name + '@' + ip,
          }
        })

        console.log(resCall)
      },

      /**
       * gb 呼叫
       */
      async gbCallPersonal (id) {
        let curtime = Math.floor(Date.now() / 1000);
        let checksum = this.$store.getters.getChecksum(curtime)
        // let resCall = await this.axios({
        //   method: 'post',
        //   url: this.$store.state.APIURL + '/youme_gb28181_gateway/bind_device',
        //   params: {
        //     appkey: this.YM_APPKEY,
        //     curtime,
        //     checksum
        //   },
        //   data: {
        //     id: '34020000001310000005',
        //     channel_number: '34020000001310000005',
        //     channel_id: this.roomId
        //   }
        // })
        let resCall = await this.axios({
          method: 'post',
          url: this.$store.state.APIURL + '/youme_gb28181_gateway/join_room',
          params: {
            appkey: this.YM_APPKEY,
            curtime,
            checksum
          },
          data: {
            id,
            channel_number: id,
            channel_id: this.roomId
          }
        })
        console.log(resCall)
      },

      /**
       * 拖拽结束
       */
      dragend (event) {
        event.dataTransfer.clearData()
      },

      /**
       * 拖拽开始
       */
      drag (event, data) {
        console.log('拖拽：', data)
        event.dataTransfer.setData('item', data)
        this.dragData = data
      },

      /**
       * 拖拽到目的地
       */
      drop (number) {
        this.memberIds[number] = this.dragData
        console.log('拖拽后的数据', this.memberIds)
        this.addMemeber(this.dragData, true)
      },

      /**
       * 双击呼叫
       **/
      addMemeber (data, drag = false) {
        let flg = true

        if (!drag) {
          this.memberIds.map(item => {
            if (item.userId === data.userId) {
              flg = false
            }
          })
        }

        if (flg) {
          if (!drag) {
            this.memberIds.push(data)
          }
          if (data.type === 1) {
            // SIP拔号
            this.callPersonal(data.name)
          } else if (data.type === 2) {
            //h323拔号
            this.HcallPersonal(data.name, data.ip)
          } else if (data.type === 3) {
            // 国标拔号
            let arr = data.userId.split('@')
            this.gbCallPersonal(arr[1])
          }
          this.$forceUpdate()
        }
      },

      /**
       * 初始化YMRTC
       */
      initYMRTC () {
        this.rtc = new YMRTC({
          appKey: this.YM_APPKEY,
          video: true,  // true 为视频+语音通讯，false 为仅语音通讯
          debug: 'all',  // 开启debug日志
          dev: false     // 使用测试环境
        })

        this.monitorRoom()
      },

      /**
       * 获取token
       */
      getToken () {
        var sha1src = this.YM_APPKEY + this.APIKEY + this.USERID
        var token = CryptoJS.SHA1(sha1src).toString(CryptoJS.enc.Hex)
        return token
      },

      /**
       * 登录
       */
      login () {
        this.rtc.login(this.USERID, this.getToken()).catch((e) => {
          console.error('登录失败', e)
        })
        this.isLogin = true
      },
      /**
       * 新建房间
       */
      showBottom () {
        if (this.isLogin) {
          this.isBottom = true
        } else {
          alert('请先登录')
        }
      },

      newRoom () {
        if (this.newRoomId === '') {
          alert('房间号不能为空')
        } else {
          this.joinRoom(this.newRoomId)
        }
      },

      /**
       * 点击加入
       */
      enterJoin (roomId) {
        if (this.isLogin) {
          if (roomId == '') {
            alert('房间号不能为空')
          } else {
            this.joinRoom(this.roomId)
          }
        } else {
          alert('请先登录')
        }
      },

      /**
       * 加入房间
       */
      joinRoom (roomId) {
        this.rtc.joinRoom(roomId).catch((e) => {
          console.log("加入房间："+ roomId)
          console.error(e)
          alert('进入频道失败')
        })
        this.isBottom = false
        this.isRoom = true
        setTimeout(() => {
          this.useLocal()
        }, 500)
        const u = navigator.userAgent
        const app = navigator.appVersion
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
        if (isiOS) {
          setTimeout(() => {
            this.windowNumber = this.windowNumber < 3 ? 3 : this.windowNumber
            this.getMemberSteam()
          }, 1000)
        }

      },

      /**
       * 退出房间
       */
      outRoom () {
        this.rtc.stopLocalMedia()
        // this.rtc.logout()
        this.sendMsg('TC|' + this.USERID)
        this.sendMsg('DGX|' + this.USERID)
        this.isRoom = false
        this.gxScreen = false
      },

      outLogin () {
        this.isLogin = false
        this.memberIds = []
        // this.$refs.myIm.logout()
        this.outRoom()
      },

      /**
       * 获取stream
       **/
      getMemberSteam () {
        this.useLocal()
        this.memberIds.map(item => {
          if (item.userId != this.USERID) {
            this.rtc.requestUserStream(item.userId).then( (stream) => {
              this.$refs.videoGroup.playVideo(item.userId, stream)
            })
          }
          if (item.userId.indexOf('gx') > -1) {
            let id = item.userId.replace('gx', '')
            this.rtc.requestShareStream(id).then((stream) => {
              this.$refs.videoGroup.playVideo(item.userId, stream)
            })
          }
        })
        this.useLocal()
      },

      /**
       * 监听房间
       */
      monitorRoom () {

        // 广播消息
        this.rtc.on('room.on-recive-message:*', (eventName, roomId, msg) => {
          console.log('====>广播消息', eventName, roomId, msg)
          let msgs = msg.msg.split('|')

          // 改变布局
          if (msgs[0] == 'BJ') {
            this.windowNumber = msgs[1]
            this.getMemberSteam()
          }

          // 删除共享
          if (msgs[0] == 'DGX') {
            this.memberIds.map((item, key) => {
              if (item.userId == msgs[1] + 'gx') {
                this.memberIds.splice(key, 1)
              }
            })
          }

          // 踢人
          if (msgs[0] == 'TR') {
            if (this.USERID == msgs[1]) {
              this.outRoom()
              this.$message.error('您被踢出房间了！')
            } else {
              this.kictStream(msgs[1])
            }
          }

          // 主动退出
          if (msgs[0] == 'TC') {
            this.kictStream(msgs[1])
          }

          // 麦克风
          if (msgs[0] == 'MKF') {
            if (this.USERID == msgs[1]) {
              this.speakSwitch(msgs[1])
            } else {
              this.memberIds.map((item, key) => {
                if (item.userId == msgs[1]) {
                  item.isSpeak = !item.isSpeak
                  this.rtc.setMute(msgs[1], !item.isSpeak)
                  this.$refs.videoGroup.isMusic(msgs[1], !item.isSpeak)
                }
              })
            }
          }

          // 扬声器
          if (msgs[0] == 'JY') {
            if (this.USERID == msgs[1]) {
              this.allVoice = !this.allVoice
            } else {
              this.memberIds.map((item, key) => {
                if (item.userId == msgs[1]) {
                  this.$refs.videoGroup.isMusic(item.userId, item.isVoice)
                  item.isVoice = !item.isVoice
                }
              })
            }
          }
        })

        // 远端用户关闭麦克风
        this.rtc.on('room.others-mic-off:*', (eventName, roomId, userId) => {
          console.log('====>远端用户关闭麦克风', roomId, userId)
          // this.setUserInfo(userId, 'isSpeak', false)
        })

        // 远端用户开启麦克风
        this.rtc.on('room.others-mic-on:*', (eventName, roomId, userId) => {
          console.log('====>远端用户开启麦克风', roomId, userId)
          // this.setUserInfo(userId, 'isSpeak', true)
        })

        // 远端用户关闭扬声器
        this.rtc.on('room.others-speaker-off:*', (eventName, roomId, userId) => {
          console.log('====>远端用户开启扬声器', roomId, userId)
          // this.setUserInfo(userId, 'isVoice', false)
        })

        // 远端用户开启扬声器
        this.rtc.on('room.others-speaker-on:*', (eventName, roomId, userId) => {
          console.log('====>远端用户关闭扬声器', roomId, userId)
          // this.setUserInfo(userId, 'isVoice', true)
        })

        this.rtc.on('room.others-speaker-on:*', (eventName, roomId, userId) => {
          console.log('====>远端用户关闭扬声器', roomId, userId)
          // this.setUserInfo(userId, 'isVoice', true)
        })

        // 事件监听：信令状态
        this.rtc.on('signaling.status:*', (eventFullName, status) => {

          if (status === 'reconnecting') {
            this.isVAN = true
            this.mesg = this.$message({
              type: 'warning',
              message: '网络已断开，正在尝试重新连接...',
              duration: 0
            })
          }

          if (status === 'connected') {
            if (this.isVAN) {
              this.getMemberSteam()
              this.mesg.close()
              this.mesg = this.$message({
                type: 'success',
                message: '网络连接成功',
                duration: 2000
              })
              this.isVAN = false
            }
          }

          if (status === 'error') {
            if (this.isVAN) {
              this.isVAN = false
              this.mesg.close()
            }
            this.mesg = this.$message({
              type: 'error',
              message: '网络重新连接失败',
              duration: 2000
            })
          }
        })

        this.rtc.on('room.member-join:*', (eventFullName, roomId, memberId) => {
          console.log('=======>用户加入房间', roomId, memberId)
          if (memberId.indexOf('share_stream') > -1) {
            this.memberIds.push({
              isVoice: true,
              isSpeak: true,
              name: memberId,
              userId: memberId
            })
          }
          console.log(this.memberIds.length, this.windowNumber)
          // if (this.memberIds.length == this.windowNumber) {
          //   this.windowNumber++
          //   this.getMemberSteam()
          // }
          // if (this.roomId == roomId) {
          this.rtc.requestUserStream(memberId).then( (stream) => {
            console.log('=======>用户加入', memberId, stream)
            this.$refs.videoGroup.playVideo(memberId, stream)
          })
          // }
        })

        this.rtc.on('local-media.has-stream',  (stream) => {
          //显示自己的视频画面
          this.$refs.videoGroup.playVideo(this.USERID, stream)
        })

        this.rtc.on('room.custom-stream-start:*', (eventName, roomId, memberId, streamName) => {
          console.log('====>custom-stream-start', roomId, memberId, streamName)
        })

        this.rtc.on('room.other-share-start:*', (eventName, roomId, memberId) => {
          console.log('============共享============')
          this.getScreen(memberId, roomId)
        })

        this.rtc.on('room.member-change:*', (eventName, roomId, users) => {
          console.log('用户变化', users)
          // if (this.roomId == roomId) {
          users.map(member => {
            member.isSpeak = true
            member.isCamera = true
            member.isVoice = true

            let userid = member.userId
            if (member.userId.indexOf('@') > -1) {
              member.type = 1
              userid = member.userId.substring(member.userId.indexOf(':') + 1, member.userId.indexOf('@'))
            }
            if (member.userId.indexOf('h323:') > -1) {
              member.type = 2
              userid = member.userId.replace('h323:', '')
            }
            if (member.userId.indexOf('gb28181') > -1) {
              member.type = 3
            }

            if (member.isJoin) {
              let flg = true
              this.memberIds.map(item => {
                if (member.userId == item.userId) {
                  // item.userId = member.userId
                  flg = false
                }
              })

              if (flg) {
                // member.name = member.name || member.userId
                member.name = userid
                this.memberIds.push(member)
              }
            } else {

              if (member.userId != member.name) {
                this.kictStream(member.userId)
              }
            }
            console.log('目前人员', this.memberIds)
          })
          if (this.memberIds.length > this.windowNumber) {
            if (users.length === 1) {
              this.windowNumber++
              this.getMemberSteam()
            } else {
              this.windowNumber = users.length
            }
          }
          this.isFristLogin = false
          // }
        })

      },
      /**
       * 启用摄像头
       */
      useLocal () {
        if (this.isLogin) {
          var s = this.rtc.getLocalMediaStatus()
          if (s === 'stop' || s === 'failed') {
            this.rtc
              .startLocalMedia({
                video: {
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  frameRate: { ideal: 30 }
                },
                audio: true
              })
              .catch((err) => {
                console.log('错误', err)
                if (err.name === 'NotAllowedError') {
                  alert('浏览器禁用了摄像头和麦克风的访问权限，或者页面没有使用 https 协议，请检查设置。')
                } else if (err.name === 'NotFoundError') {
                  alert('没有找到摄像头或麦克风，请检查它们的连接。')
                } else {
                  alert(err.name)
                }
              })
          } else {
            this.rtc.stopLocalMedia()
          }
        } else {
          alert('请先登录')
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    watch: {
      allVoice (newVal, oldVal) {
        console.log('所有video的声音:' + newVal)
        this.rtc.setAllMute(newVal)
        this.memberIds.map(item => {
          item.isVoice = newVal
          this.$refs.videoGroup.isMusic(item.userId, !newVal)
        })
      }
    },
    components: {
      TwoWindows,
      SixWindows,
      FourWindows,
      ThreeWindows,
      FiveWindows,
      LayoutCommand,
      ImCommand,
      QrCode
    }
  }
</script>

<style scoped>
  .qr {
    position: absolute;
    bottom: 137px;
    left: -35px;
  }
  .qr:after {
    content: '';
    display: block;
    width: 0px;
    border: 6px solid transparent;
    border-top: 6px solid #fff;
    height: 0px;
    position: absolute;
    top: 100px;
    left: 44px;
  }
</style>
