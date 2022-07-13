<template>
  <div class="app-container">
    <code-mirror :oldValue="oldv" :newValue="newv"/>
    <div class="left">
      <p>你好</p>
      <el-form :model="form" inline="true">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <p>你好</p>
      <el-form :model="newForm" inline="true">
        <el-form-item label="姓名">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="newForm.age"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { getHighLightDiff } from "@/utils/diff";

// import CodeMirror from '@/components/common/codeMirror.vue'
export default {
  name:'',
  components: { CodeMirror },
  data() {
    return {
      form:{
        name:1,
        age:18
      },
      newForm:{
        name:12,
        age:19
      },
      oldv:"旧文本",
			newv:"新文本"
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{
  },
}
</script>
<style lang='scss' scoped>
.app-container{
  display: flex;
  justify-content:space-between;
  .left,.right{
    width: 45%;
    height: 100%;
    border: 1px solid #eee;
    padding: 30px;
  }
}
</style>
