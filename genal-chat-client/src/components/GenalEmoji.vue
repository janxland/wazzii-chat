<template>
  <div class="emoji-content">
    <div class="emoji-container">
        <div class="emoji-list-container">
          <span class="emoji-item" 
              v-for="(item, index) in EMOJI_CURR"
              :key="item.url"
              @click="(emojiIndex=index)">
            <img  class="emoji" :src="item.url" :title="item.text" width="36px" height="36px"/>
          </span>
        </div>
        <div class="emoji-item-container">
          <span class="emoji-item"
                v-for="(item, index) in EMOJI_CURR[emojiIndex].emote"
                :key="EMOJI_CURR[emojiIndex].text+index"
                @click="addEmoji(item.text)">
            <div v-if="item.url.indexOf('http')==-1" class="emoji">{{item.text}}</div>
            <img v-if="item.url.indexOf('http')!=-1" class="emoji" :src="item.url" :title="item.text" width="36px" height="36px"/>
          </span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class GenalEmoji extends Vue {
  EMOJI_CURR = [];
  emojiIndex = 0;
  mounted() {
    const emojiData = localStorage.getItem("EMOJI");
    if (emojiData) {
      this.EMOJI_CURR = JSON.parse(emojiData);
    }
  }
  addEmoji(emoji: string) {
    this.$emit('addEmoji', emoji);
  }
}
</script>
<style lang="scss" scoped>
.emoji-content {
  color: #000;
  font-size: 20px;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  // 禁止文字被鼠标选中
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .emoji-item:hover{
    border-radius: 0.25rem;
    transition: .8s;
    background-color: #00000033;
  }
  .emoji-item{
    font-size: 16px;
    font-weight: 100;
    margin: 4px;
    cursor: pointer;
    transition: .8s;
    display: inline-block;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .emoji-content-item {
    max-height: 160px;
    overflow-y: scroll;
    span {
      cursor: pointer;
    }
  }
}
</style>
