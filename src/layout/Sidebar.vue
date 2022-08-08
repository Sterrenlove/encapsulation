<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
      <span>Hi,小萝卜</span>
    </div>
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      text-color="#333"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "@/components/common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-house",
          index: "dashboard",
          title: "系统首页",
        },
        {
          icon: "el-icon-s-operation",
          index: "table",
          title: "基础表格",
        },
        {
          icon: "el-icon-tickets",
          index: "3",
          title: "表单",
          subs: [
            {
              index: "publicForm",
              title: "基本表单",
            },
            {
              index: "editor",
              title: "富文本编辑器",
            },
            {
              index: "upload",
              title: "文件上传",
            },
          ],
        },

        {
          icon: "el-icon-rank",
          index: "6",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽列表",
            },
            {
              index: "dialog",
              title: "拖拽弹框",
            },
          ],
        },
        {
          icon: "el-icon-rank",
          index: "excel",
          title: "在线协同excel",
        },
        // {
        //   icon: "el-icon-rank",
        //   index: "table",
        //   title: "表格",
        // },
        {
          icon: "el-icon-rank",
          index: "compare",
          title: "版本比较",
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  width: 100%;
  .logo{
    height: 60px;
    background: #409eff;
    display: flex;
    line-height: 60px;
    img{
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 10px 15px;
    }
    span{
      display: block;
      color: #fff;
      font-size: 20px;
    }
  }
}
.sidebar > ul::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: calc(100vh - 60px);
  overflow-y: scroll;
}
</style>
