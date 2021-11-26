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
    <tr>
      <td @drop="drop(2)" @dragover.prevent>
        <VideoComd :data="group[2]" v-if="group[2]">
          <video :ref="group[2].userId" muted autoplay playsinline></video>
        </VideoComd>
      </td>
      <td @drop="drop(3)" @dragover.prevent>
        <VideoComd :data="group[3]" v-if="group[3]">
          <video :ref="group[3].userId" muted autoplay playsinline></video>
        </VideoComd>
      </td>
    </tr>
  </table>
</template>

<script>
import VideoComd from '../videoCommand'
export default {
  name: 'fourWindows',
  props: ['group'],
  methods: {
    drop (index) {
      this.$parent.drop(index)
      this.$forceUpdate()
    },
    playVideo (userId, stream) {
      console.log(123)
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
