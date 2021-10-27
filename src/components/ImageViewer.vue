<template>
  <div id="root">
    <el-image  id="image-viewer" :fit="cover" :src="imgSrc"/>
    <div>
      <el-row id="camera-footer" :gutter="20" align="middle" justify="center" type="flex">
        <el-col  :span="12"><img id="pic-cancel" class="footer-icon" src="./assets/ic_cancel.png"/></el-col>
        <el-col  :span="12"><img id="pic-confirm" class="footer-icon" src="./assets/ic_confirm.png"/></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageViewer',
  props: [
    'data'
  ],
  data(){
    return{
      imgSrc:''
    }
  },
  created() {
    this.imgSrc = this.data;
  },
  mounted() {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#image-viewer {
  height: 75vh;
  width: 100vw;
}
</style>
