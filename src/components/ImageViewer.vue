<template>
  <div id="root">
    <div>
    <img  id="image-viewer" :src="imgSrc"/>
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
    let vm = this;
    this.imgSrc = this.$route.params.data;
    document.getElementById('pic-cancel').onclick=function(){
          console.log('go back');
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
}

.footer-icon {
  height: 36px;
  width: 36px;
}
</style>
