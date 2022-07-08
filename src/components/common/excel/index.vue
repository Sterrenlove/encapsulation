<template>
  <div class="app-container">
    <el-button type="primary" @click="handleExport">导出</el-button>
    <div id="luckysheet" class="luckysheet-content"></div>
  </div>
</template>
 
<script>
import LuckyExcel from 'luckyexcel'
import { exportExcel } from '@/utils/export'
export default {
  name: "",
  data() {
    return {
      excelData:[
        {
          name: 'cell',
          color: '',
          index: 1,
          status: 0,
          order: 1,
          celldata: [
            {
              r: 0, // 行
              c: 0, // 列
              v: '姓名' // 值
            },
             {
              r: 1, // 行
              c: 0, // 列
              v: '张三' // 值
            },
             {
              r: 2, // 行
              c: 0, // 列
              v: '李四' // 值
            },
             {
              r: 3, // 行
              c: 0, // 列
              v: '王五' // 值
            },
            {
              r: 0,
              c: 1,
              v: '年龄'
            },
              {
              r: 1,
              c: 1,
              v: '1'
            },
              {
              r: 2,
              c: 1,
              v: '2'
            },
              {
              r: 3,
              c: 1,
              v: '3'
            }
          ],
          config: {}
        },
        {
          name: 'Sheet2',
          color: '',
          index: 1,
          status: 0,
          order: 1,
          celldata: [],
          config: {}
        },
        {
          name: 'Sheet3',
          color: '',
          index: 2,
          status: 0,
          order: 2,
          celldata: [],
          config: {}
        }
      ],
      imgSrc:require('../../../assets/images/404_images/404_cloud.png'),
      options: {
        container: 'luckysheet', //容器id名
        title: '测试Excel', // 表 头名
        lang: 'zh', // 中文
        showtoolbar: true, // 是否显示工具栏
        showinfobar: true, // 是否显示顶部信息栏
        showsheetbar: true // 是否显示底部sheet按钮
      }
    };
  },
  mounted() {
   this.init()
  },
  methods:{
    init(){
      window.luckysheet.destroy()
      this.options.data = this.excelData
      window.luckysheet.create(this.options)
      // window.luckysheet.hook={
      //   cellEditBefore:()=>{
      //     debugger
      //     console.log("编辑结束",range[0].column)
      //     return false
      //   }
      // }
      window.luckysheet.insertImage
(
this.imgSrc
,[,8,1,this.aaa()]
);
        
      
    },
    handleExport(){
      console.log("导出")
      console.log(luckysheet.getAllSheets())
      exportExcel(window.luckysheet.getAllSheets(), "测试excel")
    }
  }
};
</script>
<style lang="css" scoped>
.luckysheet-content {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
