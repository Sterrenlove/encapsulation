<template>
  <!-- 封装弹框 -->
  <div class="popup">
    <el-dialog
      :ref="popObj.popName"
      :title="popObj.dialogTitle"
      :visible.sync="popObj.dialogVisible"
      :width="popObj.popupWidth"
      :before-close="handleClose"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="popObj.showFooter">
        <el-button @click="popCancel">取 消</el-button>
        <el-button type="primary" @click="popConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    popObj: {
      type: Object,
      require:true
    },
  },
  watch: {
    // 'popObj.dialogVisible':{
    //   handler(val){
    //     console.log(val)
    //     this.popObj.dialogVisible = val.popObj.dialogVisible
    //   },
    //   deep:true
    // }
  },
  methods: {
    popCancel () {
      this.$emit('cancelPop')
    },
    popConfirm () {
      this.$emit('confirmPop')
    },
    handleClose () {
      this.popObj.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.popup {
  width: 550px;
  .el-dialog {
    z-index: 10000;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(17, 130, 251, 0.5);
    border-radius: 5px;
    margin-top: 10% !important;
  }
  .el-dialog__header {
    width: 100%;
    height: 50px;
    line-height: 38px;
    border-bottom: 1px solid #f6f7f9;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 16px;
    position: relative;
    z-index: 10;
  }
  .el-dialog__close.el-icon.el-icon-close {
    font-size: 22px;
    width: 17px;
    height: 17px;
  }
  .el-button.el-button--default {
    width: 88px;
    color: #1182fb;
    border: 1px solid #1182fb;
  }
  .el-button.el-button--primary {
    width: 88px;
  }
  .el-dialog__body {
    padding: 24px 32px;
    box-sizing: border-box;
  }
  .el-dialog__headerbtn {
    top: 16px;
  }
  .el-dialog__title {
    color: #3c4354;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    line-height: 50px;
  }
}
</style>