import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myStore = new Vuex.Store({
  state: {
    YM_APPKEY: 'YOUMEAAFBE9C2BAC3FE997C5EE5EF5A177B84BBAE3F2C',
    APIKEY: '30c03c257db31df1095d72a383d2c8e2',
    APPSECRET: 'vYnDBokpF0XZL8Yt/ogiGNSv4gv4j6memk64Bu+35FZA+fIpGNYNJchUf98cwTqSmYAaCwq0GxAgk57cCuAXNhQze/9zTnzgefZEo6ZIWsSpLXA5itRjRd0R7Ju03OMPkUrSu5A33cWNEn8HYuwfndAK/8HtWoEcYAcFKYj+vAkBAAE=',
    APPID: 7296,
    // APIURL: 'https://testsip.teampro.work'
    APIURL: 'https://youmi.aqpsp.net'
  },
  mutations: {
  },
  getters: {
    /**
     * 获取checksum
     * @param curtime时间戳
     * @param type：1是IM请求
     * @returns {function(*, *=): *}
     */
    getChecksum: (state, getters) => (curtime, type = null) => {
      let sha1src = ''
      if (type === 1) {
        sha1src = state.APPSECRET + curtime
      } else {
        sha1src = state.APPSECRET + state.APIKEY + curtime
      }
      let checksum = CryptoJS.SHA1(sha1src).toString()
      return checksum
    }
  }
})


export default myStore
