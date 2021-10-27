<template>
  <div id="app">
    <div id="camera-panel">
      <div v-show="showFrame" id="camera-frame">
        <video id="videoInput" class="canvas-big"></video>
      </div>
      <canvas v-show="showCanvas" id="image-render"></canvas>
      <div>
        <el-row id="camera-footer" :gutter="12" align="middle" justify="center" type="flex">
          <el-col :span="12"><img id="thumbnail" src="./assets/ic_placeholder.png"/></el-col>
          <el-col :span="12"><img id="shutter" src="./assets/ic_shutter.png"/></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

let video;
let canvas;

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      showFrame: true,
      showCanvas: false,
      screenH: 0,
      screenW: 0
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
    document.getElementById('shutter').onclick = function () {
      console.log("capture image");
      vm.capture();
    };
    this.startRecord2();
  },
  methods: {
    async startRecord2() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('不支持摄像设备');
        return;
      }
      let devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach(d => {
        console.log(`label = ${d.label}, group = ${d.groupId}, id = ${d.deviceId}`);
      });
      // let preferDevice = devices.find(d => {
      //   if (d.deviceId === 'default' && d.groupId === 'default') {
      //     return true;
      //   }
      //   return false;
      // });
      let ids = [
        'aedf475a11f87171ddd0baa47fcf8c2a5f8e4e4b81c054fee3de81fb99d75380',
        '0d131ca223654dd52ce8c996fb6cd030276b1596d1c7b0270603da68972cd351',
        '066783ec655fb67b7d8107eb86d43e0de32f088302d6b5721b38d4a485bc6a24',
        'f17bc172a9ddbf4e253e5299f2de0174f2487ce233d14c19660f3cdf216d996d'
      ]
      let constrains = {
        audio: false,
        video: {
          width: {min: 960, ideal: 1920, max: 1920},
          height: {min: 640, ideal: 1080, max: 1080},
          facingMode: {ideal: "environment"},
          focusMode: "continuous",
          deviceId: ids[2]
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
      canvas.getContext('2d').drawImage(video, 0, 0, 500, 300);
      console.log("capture done");
      this.showFrame = false;
      this.showCanvas = true;
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

#shutter {
  height: 40px;
  width: 40px;
}

#thumbnail {
  height: 40px;
  width: 40px;
}

canvas {
  height: 75vh;
  width: 100vw;
  display: block;
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
