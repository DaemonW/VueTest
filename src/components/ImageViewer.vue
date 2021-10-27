<template>
  <div id="root">
    <div>
    <el-image  id="image-viewer" :fit="cover" :src="imgSrc"/>
    </div>
    <div>
      <el-row id="camera-footer" :gutter="20" align="middle" justify="center" type="flex">
        <el-col  :span="12"><img id="pic-cancel" class="footer-icon" :src="require('../assets/ic_cancel.png')"/></el-col>
        <el-col  :span="12"><img id="pic-confirm" class="footer-icon" :src="require('../assets/ic_confirm.png')"/></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageViewer',
  data(){
    return{
      imgSrc:''
    }
  },
  mounted() {
    this.imgSrc = this.$route.params.data;
    console.log("data = "+this.imgSrc);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#image-viewer {
  height: 75vh;
  width: 100vw;
}

#camera-footer {
  height: 10vh;
  width: 100vw;
  background: #000000;
}

.footer-icon {
  height: 36px;
  width: 36px;
}
</style>
