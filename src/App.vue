<template>
  <div id="app">
    <div id="camera-panel">
      <div id="camera-frame">
        <video id="videoInput" class="canvas-big"></video>
      </div>
      <div id="camera-rooter">
        <div class="center">
          <button id="takePhotoButton" disabled>photo_camera</button>
        </div>
      </div>
    </div>
    <ImageViewer v-if="showGallery"/>
  </div>
</template>

<script>
import ImageViewer from './components/ImageViewer.vue';
let video;

export default {
  name: 'App',
  components: {
    ImageViewer
  },
  data() {
    return {
      showGallery: false,
      screenH:0,
      screenW:0
    }
  },
  mounted() {
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    video = document.getElementById('videoInput');
    this.startRecord();
  },
  methods: {
    startRecord() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return;
      }

      let temporaryConstraints = {
        audio: false,
        video: {
          // width: {min: 1280, ideal: 3840, max:3840},
          // height: {min: 720, ideal: 2160, max:2160},
          width: {min: 960, ideal: 1920, max: 1920},
          height: {min: 640, ideal: 1080, max: 1080},
          facingMode: {ideal: "environment"},
          focusMode: "continuous"
          // aspectRatio: 16/9
        }
      };
      navigator.mediaDevices.getUserMedia(temporaryConstraints)
          .then(this.streamHandler())
          .catch(function (err) {
            console.log(err);
          });
    },

    streamHandler() {
      return function (stream) {
        video.srcObject = stream;
        video.play();
        self.video = video;
        self.stream = stream;
        //self.onCameraStartedCallback = callback;
        //video.addEventListener('canplay', onVideoCanPlay, false);
      }
    },
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 100%;
  height: 100%;
}

#camera-frame {
  height: 85vh;
  width: 100vw;
}

#camera-rooter {
  height: 15vh;
  width: 100vw;
}

#videoInput{
  object-fit: fill;
  height: 85vh;
  width: 100vw;
  display: block;
}

.center {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
