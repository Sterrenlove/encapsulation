<template>
  <div class="app-container">
    <searchForm
      class="searchMain"
      size="medium"
      :isHandle="isHandle"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :search-data="searchData"
      :search-form="searchForm"
      :search-handle="searchHandle"
    ></searchForm>
    <tableForm
      :columObj="columObj"
      :pageObj="pageObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template  v-slot:operation="scopeVal">
        <el-button type="primary" @click="edit(scopeVal.scope.row)">编辑</el-button>
        <el-button type="danger" @click="del(scopeVal.scope.row)">删除</el-button>
      </template>
    </tableForm>
    <popForm :popObj="addPopForm" @confirmPopData ="addModelFormConfirm" @resetPopData="addModelFormCanel">
  
    </popForm>
  </div>
</template>
<script>
import searchForm from "@/components/common/baseSearchForm.vue";
import tableForm from "@/components/common/baseTable.vue";
import popForm from "@/components/common/baseDialog.vue";
import { formatTime } from "@/utils/tools";
export default {
  name: "publicTable",
  components: { searchForm, tableForm, popForm },
  data() {
    return {
      isHandle: true,
      labelWidth: "100px",
      labelPosition: "right",
      searchData: {
        // 查询参数
        name: '',
        area: '',
      },
      searchForm: [
        {
          type: "Select",
          label: "所在地区：",
          prop: "area",
          placeholder: "请选择",
          options: this.modelTypeOption,
        },
        {
          type: "Input",
          label: "姓名：",
          prop: "",
        },
      ],
      modelTypeOption: [],
      searchHandle: [
        { label: "新增", type: "primary",icon:'', handle: this.addAssessReport },
        { label: "重置", type: "plain",icon:'el-icon-refresh-right', handle: this.resetForm },
        { label: "查询", type: "primary",icon:'el-icon-search', handle: this.handleSearch },
      ],
      pageObj: {
        //分页对象
        total: 0,
        pageData: {
          pageNum: 1,
          pageSize: 13,
        },
      },
      columObj: {
        // 选择框
        loading: false, //是否加载
        isSerial: true, //是否需要序列
        isSelect: false, //是否需要复选框
        isPagination:true, //是否需要分页
        isOperation:true,//是否需要操作栏
        tableData:[], //表格数据来源
        tableCol: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "所在地区",
            prop: "area",
          },
          {
            label: "更新时间",
            prop: "updatedTime",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => { 
              if(row.updatedTime == 0){
                return "1970-01-01 08:00:00"
              }else{
                return formatTime(row.updatedTime,"yyyy.MM.dd&hh:mm:ss")
              }
            } 
          },
        ],
      },
      addPopForm: {
        showFooter: true,
        popName: "addModelForm",
        dialogTitle: "新增",
        dialogVisible: false,
        popupWidth: "700px",
        popCancel: this.addModelFormCanel,
        popConfirm: this.addModelFormConfirm,
      },
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    modelTypeOption(val) {
      this.searchForm[0].options = val;
    },
  },
  filter: {},
  methods: {
    // 搜索
    handleSearch() {
      this.pageObj.pageData = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
    // 获取数据列表
    getList() {
      this.columObj.tableData=[
        {
          name:"张三",
          area:"陕西西安",
          updatedTime:0
        },
        {
          name:"李四",
          area:"甘肃庆阳",
          updatedTime:0
        }
      ]
    },
    // 表单重置
    resetForm() {
      Object.assign(this.$data.searchData, this.$options.data().searchData);
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageObj.pageData.pageNum = val;
      this.getList();
    },
    //条数变化
    handleSizeChange(val) {
      this.pageObj.pageData.pageSize = val;
      this.pageObj.pageNum = 1;
      this.getList();
    },
    edit(row){
      console.log(row)
    },
    addModelFormConfirm(){},
    addModelFormCanel(){}
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-upload{
  width: 100%;
}
::v-deep .el-upload-dragger{
  width: 100%;
}
::v-deep .el-col-6{
  width: 27%;
}
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: none;
}
::v-deep .el-list-enter,
::v-deep .el-list-leave-active {
  opacity: 0;
}
</style>
