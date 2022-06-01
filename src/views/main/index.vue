<template>
  <div class="app_contaner">
    <el-container>
      <el-aside width="300px">
        <div class="logo">
          <img src="../../assets/images/logo.png" alt="">
          <span>小萝卜呀</span>
        </div>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>导航一</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-message"></i>导航二</template
            >
            <el-menu-item-group>
              <template slot="title">分组二</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="rightContent">
            <p>admin</p>
            <el-dropdown>
              <i class="el-icon-caret-bottom" style="margin:0 10px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main>
          main
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "mainPage",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.el-dropdown{
  color: #fff;
}
.el-container {
  height: 100%;
  .logo{
    height: 50px;
    background: #2ca9fd;
    color: #fff;
    font-size: 14px;
    display: flex;
    img{
      height: 40px;
      border-radius: 50%; 
      padding-top: 5px;
      display: block;
      margin-left: 20px;
    }
    span{
      display: block;
      line-height: 50px;
      margin-left: 10px;
    }
  }
  .header{
   text-align: right; 
   font-size: 14px;
   height:50px!important;
   line-height: 50px;
   background: #2ca9fd;
   .rightContent{
     height: 100%;
     p{
       display: inline-block;
       color: #fff;
       margin: 0;
     }
   }
  }
}
</style>
