import Vue from 'vue'
import App from './App.vue'
import Camera from "./components/Camera";
import VueRouter from "vue-router";
import ImageViewer from "./components/ImageViewer";

Vue.config.productionTip = false
Vue.use(VueRouter);

const NotFound = {template: '<p>Page not found</p>'};

const routes = [
    {path: '/', name: '/', component: App},
    {path: '/camera', name: 'camera', component: Camera},
    {path: '/image', name: 'image', component: ImageViewer},
    {path: '/404.html', name: '404', component: NotFound},
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

const store = {
    deviceId: [],
    deviceIndex: 0,
    setIds(ids) {
        ids.forEach(id => {
            this.deviceId.push(id);
        });
    },
    setIndex(index) {
        this.deviceIndex = index;
    }
}

const app = new Vue({
    data() {
        return {
            store,
        }
    },
    router,
    render(h) {
        return h(App)
    }
});
app.$mount('#app');
