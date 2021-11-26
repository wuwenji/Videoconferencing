<template>
  <table class="video-table">
    <tr>
      <td @drop="drop(0)" @dragover.prevent>
        <VideoComd :data="group[0]" v-if="group[0]">
          <video
            draggable="true"
            @dragend="videoDragend($event)"
            @dragstart="videoDrag(0)"
            @drop="videoDrog(0)"
            :ref="group[0].userId" muted autoplay playsinline></video>
        </VideoComd>
      </td>
      <td @drop="drop(1)" @dragover.prevent>
        <VideoComd :data="group[1]" v-if="group[1]">
          <video
            draggable="true"
            @dragend="videoDragend($event)"
            @dragstart="videoDrag(1)"
            @drop="videoDrog(1)"
            :ref="group[1].userId" muted autoplay playsinline></video>
        </VideoComd>
      </td>
    </tr>
  </table>
</template>

<script>
import VideoComd from '../videoCommand'
export default {
  name: 'TwoWindows',
  props: ['group'],
  data () {
    return {
      dragVideo: false,
      starIndex: null
    }
  },
  methods: {
    videoDragend (e) {
      e.dataTransfer.clearData()
      this.dragVideo = false
    },
    videoDrag (num) {
      this.dragVideo = true
      this.starIndex = num
    },
    videoDrog (num) {
      if (this.dragVideo) {
        this.$parent.swapArr(this.starIndex, num)
      }
    },
    drop (index) {
      if (!this.dragVideo) {
        this.$parent.drop(index)
        this.$forceUpdate()
      }
    },
    playVideo (userId, stream) {
      this.$refs[userId].srcObject = stream
    }
  },
  created () {

  },
  components: {
    VideoComd
  }
}
</script>

<style scoped>

</style>
