<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<style lang="scss">
#app{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.app-container{
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
}
</style>
