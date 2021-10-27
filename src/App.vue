<template>
<html>
<body>
<div id="app">
  <router-view></router-view>
</div>
</body>
</html>
</template>

<script>

export default {
  name: "App",
  mounted() {
    this.$router.push('camera');
  }
}
</script>

<style>
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #000000;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
