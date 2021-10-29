<template>
  <div id="root">
    <div>
      <img id="image-viewer" :src="imgSrc"/>
    </div>
    <div>
      <div id="camera-footer">
        <div class="icon-wrapper">
          <img id="pic-cancel" class="footer-icon" :src="require('../assets/ic_cancel.png')"/>
        </div>
        <div class="icon-wrapper">
          <img id="pic-confirm" class="footer-icon" :src="require('../assets/ic_confirm.png')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageViewer',
  data() {
    return {
      imgSrc: ''
    }
  },
  mounted() {
    let vm = this;
    this.imgSrc = this.$route.params.data;
    document.getElementById('pic-cancel').onclick = function () {
      vm.$router.go(-1);
    };
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#image-viewer {
  height: 75vh;
  width: 100vw;
  object-fit: cover;
}

#camera-footer {
  height: 10vh;
  width: 100vw;
  background: #000000;
  display: -webkit-flex;
  display: flex;
}

.icon-wrapper{
  width: 50%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}

.footer-icon {
  height: 36px;
  width: 36px;
}
</style>
