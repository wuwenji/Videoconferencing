<template>
  <table class="video-table">
    <tr>
      <td @drop="drop(0)" @dragover.prevent>
        <VideoComd :data="group[0]" v-if="group[0]">
          <video :ref="group[0].userId" muted autoplay playsinline></video>
        </VideoComd>
      </td>
      <td @drop="drop(1)" @dragover.prevent>
        <VideoComd :data="group[1]" v-if="group[1]">
          <video :ref="group[1].userId" muted autoplay playsinline></video>
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
  methods: {
    drop (index) {
      this.$parent.drop(index)
      this.$forceUpdate()
    },
    playVideo (userId, stream) {
      this.$refs[userId].srcObject = stream
    }
  },
  components: {
    VideoComd
  }
}
</script>

<style scoped>

</style>
