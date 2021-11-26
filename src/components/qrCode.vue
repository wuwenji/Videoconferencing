<template>
  <div>
    <img :src="url" alt="">
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'qrCode',
  data () {
    return {
      url: ''
    }
  },
  props: ['roomId'],
  mounted () {
    let text = window.location.href + '?=' + this.roomId
    QRCode.toDataURL(text).then(url => {
      console.log(text)
      this.url = url
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 9999;
  }
</style>
