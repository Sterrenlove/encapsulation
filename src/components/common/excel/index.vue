<template>
  <div class="app-container">
    <div class="button">
      <el-button type="primary" @click="handleExport">导出</el-button>
      <el-upload name="file" ref="upload" action="" :limit="1"  :before-upload="beforeUpload">
        <el-button  size="medium" type="primary">导入本地文件</el-button>
      </el-upload>
      <el-button type="primary" @click="handleExport">导入后端返回的文件</el-button>
      <el-button type="primary" @click="getFunction">计算公式</el-button>
      <el-button type="primary" @click="getSelect">获得选区</el-button>
    </div>
    <div id="luckysheet" class="luckysheet-content"></div>
  </div>
</template>
 
<script>
import LuckyExcel from "luckyexcel";
import { exportExcel } from "@/utils/export";
export default {
  name: "",
  data() {
    return {
      excelData: [
        {
          name: "cell",
          color: "",
          index: 1,
          status: 0,
          order: 1,
          celldata: [
            {
              r: 0, // 行
              c: 0, // 列
              v: "姓名", // 值
            },
            {
              r: 1, // 行
              c: 0, // 列
              v: "张三", // 值
            },
            {
              r: 2, // 行
              c: 0, // 列
              v: "李四", // 值
            },
            {
              r: 3, // 行
              c: 0, // 列
              v: "王五", // 值
            },
            {
              r: 0,
              c: 1,
              v: "年龄",
            },
            {
              r: 1,
              c: 1,
              v: "1",
            },
            {
              r: 2,
              c: 1,
              v: "2",
            },
            {
              r: 3,
              c: 1,
              v: "3",
            },
          ],
          config: {},
        },
        {
          name: "Sheet2",
          color: "",
          index: 1,
          status: 0,
          order: 1,
          celldata: [],
          config: {},
        },
        {
          name: "Sheet3",
          color: "",
          index: 2,
          status: 0,
          order: 2,
          celldata: [],
          config: {},
        },
      ],
      imgSrc: require("../../../assets/images/404_images/404_cloud.png"),
      options: {
        container: "luckysheet", //容器id名
        title: "测试Excel", // 表 头名
        lang: "zh", // 中文
        showtoolbar: true, // 是否显示工具栏
        showinfobar: true, // 是否显示顶部信息栏
        showsheetbar: true, // 是否显示底部sheet按钮
        config: {
          authority: {
            selectLockedCells: 1, //选定锁定单元格
            selectunLockedCells: 1, //选定解除锁定的单元格
            formatCells: 1, //设置单元格格式
            formatColumns: 1, //设置列格式
            formatRows: 1, //设置行格式
            insertColumns: 1, //插入列
            insertRows: 1, //插入行
            insertHyperlinks: 1, //插入超链接
            deleteColumns: 1, //删除列
            deleteRows: 1, //删除行
            sort: 1, //排序
            filter: 1, //使用自动筛选
            usePivotTablereports: 1, //使用数据透视表和报表
            editObjects: 1, //编辑对象
            editScenarios: 1, //编辑方案
            sheet: 1, //如果为1或true，则该工作表受到保护；如果为0或false，则该工作表不受保护。
            hintText: "", //弹窗提示的文字
            algorithmName: "None", //加密方案：MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
            saltValue: null, //密码解密的盐参数，为一个自己定的随机数值

            allowRangeList: [
              {
                //区域保护
                name: "cell", //名称
                password: "1", //密码
                hintText: "", //提示文字
                algorithmName: "None", //加密方案：MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
                saltValue: null, //密码解密的盐参数，为一个自己定的随机数值
                sqref: "$C$1:$D$5", //区域范围
              },
            ],
          },
        },
        hook: {
          cellEditBefore: (range) => {
            // if (range[0].column_focus == 1 && range[0].row_focus == 1) {
            //   console.log("编辑结束", range);
            //   return false;
            // }
          },
          rangePasteBefore: (range, data) => {
            // console.log("禁止粘贴");
            // return false;
          },
          cellUpdateBefore: function (r, c, value, isRefresh) {
            console.log("更新单元格", r, c, value, isRefresh);
            if (r == 0 && c == 0) {
              console.log("此列禁止更新");
              return false;
            }
          },
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      window.luckysheet.destroy();
      this.options.data = this.excelData;
      window.luckysheet.create(this.options);
      //       window.luckysheet.insertImage
      // (
      // this.imgSrc
      // ,[,8,1,this.aaa()]
      // );
    },
    // 导入
    beforeUpload(file){
      // let suffix = this.getSuffix(file.name)
      // if(suffix !== 'xlsx'){
      //   this.$message.error("文件格式只能是.xlsx")
      //   return false
      // }
      luckysheet.destroy() //先销毁当前容器
      LuckyExcel.transformExcelToLucky(file,function(exportJson){
        console.log(exportJson)
        if(exportJson.sheets == null || exportJson.sheets.length == 0){
          this.$message.warning("读取excel文件内容失败，目前不支持xls文件")
          return
        }
        luckysheet.create({
          container:'luckysheet',
          showtoolbar: true, // 是否显示工具栏
          showinfobar: true, // 是否显示顶部信息栏
          showsheetbar: true, // 是否显示底部sheet按钮
          data:exportJson.sheets,
          title:exportJson.info.name,
          userInfo:exportJson.info.name.creator
        })
      })
    },
    // 从后端获取
    getFile(){
      // 请求接口 获取参数
      downloadPDF({"filePath":''}).then(res=>{
        // 需要将获取到的base64转成file
        let fileText = this.changeFile(res.data,'传入.xlsx')
        luckysheet.destroy() //先销毁当前容器
        LuckyExcel.transformExcelToLucky(file,function(exportJson){
          console.log(exportJson)
          if(exportJson.sheets == null || exportJson.sheets.length == 0){
            this.$message.warning("读取excel文件内容失败，目前不支持xls文件")
            return
          }
          luckysheet.create({
            container:'luckysheet',
            showtoolbar: true, // 是否显示工具栏
            showinfobar: true, // 是否显示顶部信息栏
            showsheetbar: true, // 是否显示底部sheet按钮
            data:exportJson.sheets,
            title:exportJson.info.name,
            userInfo:exportJson.info.name.creator
          })
        })
      })
    },
    // 转file的方法
    changefile(dataurl,filename){
      var bstr = window.atob(dataurl)
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while(n--){
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr],filename,{
        type:'application/vnd.ms-excel'
      })
    },
    // 导出
    handleExport() {
      console.log(luckysheet.getAllSheets());
      exportExcel(window.luckysheet.getAllSheets(), "测试excel")
    },
    // 获取公式
    getFunction(){
      const _data = luckysheet.getRangeAxis()
      const arr = _data[0].split(':')
      luckysheet.setCellValue(4, 1,`=SUM(${arr[0]}:${arr[1]})`)

    },
    getSelect(){
      // console.log(luckysheet.getRangeAxis())
    }
  },
};
</script>
<style lang="scss" scoped>
.luckysheet-content {
  width: 100%;
  height: calc(100% - 40px);
}
.button{
  display: flex;
  margin-bottom: 20px;
  .el-button{
    margin-right: 20px;
  }
}
::v-deep .el-upload--text{
  width: auto;
  height: auto;
  border: none;
}
</style>
