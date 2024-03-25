import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Viewer from 'v-viewer';

Vue.config.productionTip = false;
Vue.directive('drag', {
  bind(el) {
    let setPos={
      x:0,
      y:0
    }
    let lastPos={
      x:0,
      y:0
    };
    function move(curPos: { x: any; y: any; }){
      const d={
        dX:curPos.x-lastPos.x,
        dY:curPos.y-lastPos.y
      };
      setPos.x+=d.dX;
      setPos.y+=d.dY;
      el.style.transform=`translate(${setPos.x}px,${setPos.y}px)`;
      lastPos.x=curPos.x;
      lastPos.y=curPos.y;
    }
    el.addEventListener("mousedown",(e)=>{
      e.stopPropagation();
      document.body.style.userSelect = 'none';
      lastPos.x=e.clientX;
      lastPos.y=e.clientY;
      document.addEventListener('mousemove',mouseMove);
      document.addEventListener('mouseup',mouseUp)
    });
    function mouseMove(e: { clientX: any; clientY: any; }) {
      const curPos={
        x:e.clientX,
        y:e.clientY
      }
      move(curPos)
    }
    function mouseUp(e: { stopPropagation: () => void; clientX: any; clientY: any; }) {
      e.stopPropagation();
      const curPos={
        x:e.clientX,
        y:e.clientY
      };
      move(curPos);
      document.body.style.userSelect = '';
      document.removeEventListener("mousemove",mouseMove);
      document.removeEventListener('mouseup',mouseUp)
    }
  }
});
// 引入ant-desigin
import './ant-desigin';

// 引入moment
import moment from 'moment';
// 使用中文时间
Vue.prototype.$moment = moment;

// 图片预览插件
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer, {
  defaultOptions: {
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 4,
      reset: 4,
      prev: 0,
      next: 0,
      rotateLeft: 4,
      rotateRight: 4,
      flipHorizontal: 4,
      flipVertical: 4,
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
