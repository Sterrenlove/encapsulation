<template>
  <div class="wrapper">
    <div class="contentLeft">
      <v-sidebar></v-sidebar>
    </div>
    <div class="contentRight" :class="{ 'content-collapse': collapse }">
      <v-head></v-head>
      <div class="content-box">
        <v-tags></v-tags>
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
          <!-- <el-backtop target=".content"></el-backtop> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "@/components/common/bus";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
  },
  created() {
    bus.$on("collapse-content", (msg) => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
  position: relative;
  .contentLeft {
    width: 300px;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }
  .contentRight {
    position: absolute;
    left: 300px;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .content-collapse {
    left: 70px;
  }
}
</style>
