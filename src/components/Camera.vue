<template>
  <div id="camera-panel">
    <div v-show="showFrame" id="camera-frame">
      <video id="videoInput" class="canvas-big" :style="{height:vh+'px'}"></video>
    </div>
    <canvas v-show="false" id="image-render"></canvas>
    <div>
      <div id="camera-footer" :style="{height:fh+'px'}">
        <div class="icon-wrapper" v-show="showFrame">
          <img id="thumbnail" :src="require('../assets/ic_placeholder.png')" class="footer-icon"/>
        </div>
        <div class="icon-wrapper" v-show="showFrame">
          <img id="shutter" :src="require('../assets/ic_shutter.png')" class="footer-icon"/>
        </div>
        <div class="icon-wrapper" v-show="showFrame">
          <img id="toggle" :src="require('../assets/ic_toggle.png')" class="footer-icon"/>
        </div>
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
  name: 'Camera',
  components: {},
  data() {
    return {
      showFrame: true,
      showImage: false,
      videoHeight: 0,
      videoWidth: 0,
      imageSrc: '',
      ids: [],
      index: 0,
      stream: null,
      constrain: {
        audio: false,
        video: {
          width: {min: 1080, ideal: 1920, max: 3840},
          height: {min: 720, ideal: 1080, max: 2160},
          facingMode: {ideal: "environment"},
          focusMode: "continuous",
        }
      },
      vh:0,
      fh:0,
    }
  },
  created() {
    this.ids = this.$root.$data.store.deviceId;
    this.index = this.$root.$data.store.deviceIndex;
    this.vh=document.body.clientHeight*0.88;
    this.fh=document.body.clientHeight-this.vh;
  },
  mounted() {
    let vm = this;
    video = document.getElementById('videoInput');
    video.addEventListener('canplay', () => {
      vm.videoWidth = video.videoWidth;
      vm.videoHeight = video.videoHeight;
    });
    canvas = document.getElementById('image-render');
    shutter = document.getElementById('shutter');
    shutter.onclick = function () {
      vm.capture();
    };

    thumbnail = document.getElementById('thumbnail')
    thumbnail.onclick = function () {
    };

    toggle = document.getElementById('toggle');
    toggle.onclick = function () {
      vm.stopRecorder();
      vm.nextCamera();
      vm.startRecorder(vm.constrain);
    };
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !navigator.mediaDevices.enumerateDevices) {
      alert('该设备不支持媒体设备功能!');
      return;
    }
    this.findConstrains().then(function () {
      vm.constrain.video.deviceId = vm.ids[vm.index];
      vm.startRecorder(vm.constrain);
    });
  },
  methods: {
    async findConstrains() {
      let devices = await navigator.mediaDevices.enumerateDevices();
      devices = devices.filter(d => {
        if (d.deviceId === '' || d.kind !== 'videoinput') {
          return false;
        }
        return true;
      });
      if (devices === null || devices.length === 0) {
        alert('没有可用的摄像设备!');
        return;
      }
      this.ids = [];
      devices.forEach(d => {
        this.ids.push(d.deviceId);
      });
      return new Promise(resolve => {
        resolve('');
      });
    },

    startRecorder(constrains) {
      navigator.mediaDevices.getUserMedia(constrains)
          .then(this.streamHandler())
          .catch(function (err) {
            console.log(err);
          });
    },
    stopRecorder() {
      if (video !== null) {
        video.pause();
        video.srcObject = null;
      }
      if (this.stream !== null) {
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    },

    streamHandler() {
      let vm = this;
      return function (stream) {
        vm.stream = stream;
        video.srcObject = stream;
        video.play();
      }
    },
    capture() {
      if (canvas === null || canvas === undefined) {
        return;
      }
      if (this.videoHeight === 0 || this.videoWidth === 0) {
          this.videoHeight = 1920;
          this.videoWidth = 1080;
      }
      let ctx = canvas.getContext('2d');
      let as = this.getPixelRatio(ctx);
      console.log(`as = ${as}`);
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageSrc = canvas.toDataURL('image/jpeg');
      this.showFrame = false;
      this.showImage = true;
      this.stopRecorder();
      this.$root.$data.store.setIds(this.ids);
      this.$root.$data.store.setIndex(this.index);
      this.$router.push({name: 'image', params: {data: this.imageSrc}});
    },
    nextCamera() {
      let size = this.ids.length;
      this.index++;
      if (this.index >= size) {
        this.index = 0;
      }
      this.constrain.video.deviceId = this.ids[this.index];
    },
    getPixelRatio(context) {
      let backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    onHandlePic() {

    }
  }
}
</script>

<style scoped>
#videoInput {
  object-fit: cover;
  display: block;
  width: 100vw;
}

.footer-icon {
  height: 36px;
  width: 36px;
}

.icon-wrapper{
  width: 33.33%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}

#camera-footer {
  width: 100vw;
  background: #000000;
  display: flex;
  display: -webkit-flex;
}
</style>
