<template>
  <div id="app">
    <router-view />
    <!-- <div  v-drag>
      <genal-music></genal-music>
    </div> -->
    <img class="background" v-if="background" :src="background" alt="" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { DEFAULT_BACKGROUND } from '@/const';
import { getSiteWebInfo }  from '@/api/apis';
import GenalMusic from '@/components/GenalMusic.vue';
const appModule = namespace('app');

@Component({
  components: {
    GenalMusic
  },
})
export default class GenalChat extends Vue {
  @appModule.Getter('user') user: User;
  @appModule.Getter('background') background: string;
  @appModule.Mutation('set_mobile') setMobile: Function;
  @appModule.Mutation('set_background') set_background: Function;

  mounted() {
    this.setMobile(this.isMobile());
    this.webInfo();
    if (!this.background || !this.background.trim().length) {
      this.set_background(DEFAULT_BACKGROUND);
    }
  }
  webInfo(){
    getSiteWebInfo({id:5}).then(res=>{
      if (res.data.code === 200 ){

        let DATA = res.data;
        console.log(DATA);
        
        let settings = JSON.parse(DATA.result[0].value);
        localStorage.setItem("PLAYLIST_LIST",JSON.stringify(settings.PLAYLIST_LIST));
        localStorage.setItem("EMOJI",JSON.stringify(settings.EMOJI));
        localStorage.setItem("DEFAULT_WALLPAPER",JSON.stringify(settings.DEFAULT_WALLPAPER));
        localStorage.getItem("favoriteWallpaper") || localStorage.setItem("favoriteWallpaper",JSON.stringify(settings.favoriteWallpaper));
      }
    })
  }
  isMobile() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag && flag.length;
  }
}
</script>
<style lang="scss">
body {
  zoom: 1;
  width: 100vw !important;
  height: 100vh !important;
  padding: 0;
  margin: 0;
}
body.swal2-height-auto{
  height: 100vh !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  position: relative;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  color: rgba(255, 255, 255, 0.85);
  background-color: #fff;
  .background {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
