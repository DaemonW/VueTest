import Vue from 'vue'
import App from './App.vue'
import Camera from "./components/Camera";

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import ImageViewer from "./components/ImageViewer";

Vue.use(ElementUI);
Vue.use(VueRouter);

const NotFound = { template: '<p>Page not found</p>' };

const routes = [
  { path: '/',name:'/', component: App },
  { path: '/camera',name:'camera', component: Camera },
  { path: '/image',name:'image', component: ImageViewer },
  { path: '/404.html',name:'404', component: NotFound },
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

const app = new Vue({
  router,
  render (h) { return h(App) }
});
app.$mount('#app');
