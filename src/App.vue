<template>
  <div id="app">
    <div id="camera-panel">
      <div v-show="showFrame" id="camera-frame">
        <video id="videoInput" class="canvas-big"></video>
      </div>
      <canvas v-show="false" id="image-render" height="1920" width="1080"></canvas>
      <div>
        <el-row id="camera-footer" :gutter="12" align="middle" justify="center" type="flex">
          <el-col v-show="showFrame" :span="8"><img id="thumbnail" class="footer-icon" :src="require('./assets/ic_placeholder.png')"/></el-col>
          <el-col v-show="showFrame" :span="8"><img id="shutter" class="footer-icon" :src="require('./assets/ic_shutter.png')"/></el-col>
          <el-col v-show="showFrame" :span="8"><img id="toggle" class="footer-icon" :src="require('./assets/ic_toggle.png')"/></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>



let video;
let canvas;
let shutter;
let thumbnail;
let toggle;

export default {
  name: 'App',
  components: {},
  data() {
    return {
      showFrame: true,
      showImage: false,
      screenH: 0,
      screenW: 0,
      imageSrc: '',
      ids: [],
      index: 0,
    }
  },
  created() {
    this.screenW = document.body.clientWidth;
    this.screenH = document.body.clientHeight;
    console.log(`width = ${this.screenW}, height = ${this.screenH}`);
  },
  mounted() {
    video = document.getElementById('videoInput');
    canvas = document.getElementById('image-render');
    let vm = this;
    shutter = document.getElementById('shutter');
    shutter.onclick = function () {
      vm.capture();
    };

    thumbnail = document.getElementById('thumbnail')
        thumbnail.onclick = function () {

    };

    toggle = document.getElementById('toggle');
    toggle.onclick = function () {

    };
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !navigator.mediaDevices.enumerateDevices) {
      alert('该设备不支持媒体设备功能!');
      return;
    }
    this.startRecord2();
  },
  methods: {
    async startRecord2() {
      let devices = await navigator.mediaDevices.enumerateDevices();
      devices = devices.filter(d => {
        console.log(`label = ${d.label}, group = ${d.groupId}, id = ${d.deviceId}`);
        if (d.deviceId === '' || d.kind !== 'videoinput') {
          return false;
        }
        return true;
      });
      if(devices===null || devices.length===0){
        alert('没有可用的摄像设备!');
        return;
      }
      devices.forEach(d => {
        this.ids.push(d.deviceId);
      });
      let constrains = {
        audio: false,
        video: {
          width: {min: 1080, ideal: 1920, max: 3840},
          height: {min: 720, ideal: 1080, max: 2160},
          facingMode: {ideal: "environment"},
          focusMode: "continuous",
          //deviceId: this.ids[2]
        },
      }
      navigator.mediaDevices.getUserMedia(constrains)
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
      }
    },
    capture() {
      if (canvas === null || canvas === undefined) {
        console.log("null object");
        return;
      }
      console.log(`video width = ${video.width}, video height=${video.height}`);
      console.log(`canvas width = ${canvas.width}, canvas height=${canvas.height}`);
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log("capture done");
      this.imageSrc = canvas.toDataURL('image/jpeg');
      this.showFrame = false;
      this.showImage = true;
      this.$router.push('image');
    },
    onHandlePic() {

    }
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
  background: #000000;
  margin: 0;
  width: 100%;
  height: 100%;
}

#videoInput {
  object-fit: cover;
  display: block;
  height: 75vh;
  width: 100vw;
}

.footer-icon {
  height: 36px;
  width: 36px;
}

#image-viewer {
  height: 75vh;
  width: 100vw;
}

#camera-footer {
  height: 10vh;
  width: 100vw;
  background: #000000;
}
</style>
