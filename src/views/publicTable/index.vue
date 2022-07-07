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
      :tableData="tableData"
      :columObj="columObj"
      :isPagination="isPagination"
      :pageObj="pageObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
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
      isPagination: true,
      pageObj: {
        //分页对象
        total: 0,
        pageData: {
          pageNum: 1,
          pageSize: 13,
        },
      },
      tableData: [],
      columObj: {
        // 选择框
        loading: false,
        showIndex: true,
        selection: false,
        columnData: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "所在地区",
            prop: "",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return this.areaFilter(row.level1Area);
            },
          },
          {
            label: "更新时间",
            prop: "",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => { 
              if(row.updatedTime == 0){
                return "1970-01-01 08:00:00"
              }else{
                return formatTime(row.updatedTime,"yyyy.MM.dd&hh:mm:ss")
              }
            } 
          },
          {
            label: "操作",
            width: "200",
            align:"center",
            operation: [
              {
                funName: this.editForm, //功能函数名
                type: "primary",
                label: "编辑",
              },
            ],
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
    areaFilter(val) {
      if(val && this.modelTypeOption.length>0) return this.modelTypeOption.filter(item => item.value == val)[0].label
    },
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
    // 添加
    addAssessReport() {
      // Object.assign(this.$data.addForm, this.$options.data().addForm);
    },
    // 编辑
    editForm(row){
    },
    // 删除
    handleDelete(row) {
    },
    //取消
    addModelFormCanel() {
      // Object.assign(this.$data.addForm, this.$options.data().addForm);
      // this.addPopForm.dialogVisible = false;
    },
    // 确定
    addModelFormConfirm() {
    },
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
