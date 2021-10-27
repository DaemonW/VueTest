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
import ImageViewer from './components/ImageViewer.vue'

export default {
  name: 'App',
  components: {
    ImageViewer
  },
  data() {
    return {
      showGallery: false
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  width: 100%;
  height: 100%;
}

#camera-frame {
  height: 85vh;
}

#camera-rooter {
  height: 15vh;
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
