<template>
  <el-row>
    <el-col :span="24">
      <el-tabs :tab-position="tabPosition" style="height: 50px;margin-left: 10px;margin-right: 10px">
        <el-tab-pane label="二次开发1">二次开发1</el-tab-pane>
        <el-tab-pane label="二次开发2">二次开发2</el-tab-pane>
        <el-tab-pane label="二次开发3">二次开发3</el-tab-pane>
        <el-tab-pane label="二次开发4">二次开发4</el-tab-pane>
        <el-tab-pane label="二次开发5">二次开发5</el-tab-pane>
      </el-tabs>

    </el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <el-tree
          :props="props1"
          :load="loadNode1"
          lazy
          show-checkbox>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="grid-content bg-purple-light">
        <div class="container" align="center">
          <div class="player" style="width: 100%;height: 100%">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          @play="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
            >
            </video-player>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {videoPlayer} from 'vue-video-player'

export default {
  name: 'develop',
  data () {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // 你的m3u8地址（必填）
        }],
        // poster: 'poster.jpg', 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      tabPosition: 'top',
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay (player) {
      alert('play')
    },
    onPlayerPause (player) {
      alert('pause')
    },
    loadNode1 (node, resolve) {
      if (node.level === 0) {
        return resolve([{name: 'region'}])
      }
      if (node.level > 1) return resolve([])
      setTimeout(() => {
        const data = [{
          name: 'leaf',
          leaf: true
        }, {
          name: 'zone',
          zones: [{
            name: '123', leaf: true}]
        }]
        resolve(data)
      }, 500)
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 80%;
  }
</style>
