<template>
  <div class="app-container">
    <nx-form ref="searchForm" :source="searchForm" :config="searchConfig">
      <div slot="search">
        <el-button type="primary" @click="search()"
          >查询</el-button
        >
        <el-button @click="resetSearchForm()">重置</el-button>
        <el-button @click="addForm">新增</el-button>
      </div>
    </nx-form>
    <!-- 弹框 -->
    <baseDialog :popObj = popObj @cancelPop="cancelPop" @confirmPop="confirmPop">
      <nxForm ref="addForm" :source="addFormData" :config="addConfig" :rules="addFormRules">
        <div slot="append">123</div>
         <template slot="append">点击</template>
      </nxForm>  
    </baseDialog>
  </div>
</template>
<script>
import nxForm from "@/components/common/baseForm.vue"
import baseDialog from "@/components/common/baseDialog.vue"
export default {
  components:{ nxForm,baseDialog },
  data() {
    return {
      searchForm: {
        keyWord: "",
        newsType: "",
        newsStatus: "",
        publishTime: [],
        createTime: [],
      },
      popObj:{
        popName:'addFOrm',
        dialogTitle:"新增",
        dialogVisible:false,
        popupWidth:'800px',
        showFooter:true
      },
      addFormData:{
        name:'',
        age:'',
        sex:''
      },
      addFormRules:{
        'name':[{required:true,message:'请输入姓名',trigger:'blur'}],
        'age':[{required:true,message:'请输入年龄',trigger:'blur'}],
      }
    };
  },
  computed: {
    searchConfig() {
      return [
        {
          key: "keyWord",
          component: "el-input",
          span: 8,
          label: "关键字",
          props: {
            placeholder: "标题/创建人",
            clearable: true,
          },
        },
        {
          key: "newsType",
          component: "el-select",
          span: 8,
          label: "类型:",
          props: {
            placeholder: "请选择",
            clearable: true,
          },
          data: this.newsTypes,
        },
        {
          key: "newsStatus",
          component: "el-select",
          span: 8,
          label: "状态:",
          props: {
            placeholder: "请选择",
            clearable: true,
          },
          data: [],
        },
        {
          key: "publishTime",
          component: "el-date-picker",
          label: "发布时间:",
          span: 8,
          props: {
            clearable: true,
            valueFormat: "timestamp",
            type: "datetimerange",
            defaultTime: ["00:00:00", "23:59:59"],
            rangeSeparator: "-",
            startPlaceholder: "请选择开始时间",
            endPlaceholder: "请选择结束时间",
          },
        },
        {
          key: "createTime",
          component: "el-date-picker",
          label: "创建时间:",
          span: 8,
          props: {
            clearable: true,
            valueFormat: "timestamp",
            type: "datetimerange",
            defaultTime: ["00:00:00", "23:59:59"],
            rangeSeparator: "-",
            startPlaceholder: "请选择开始时间",
            endPlaceholder: "请选择结束时间",
          },
        },
        {
          component: "slot",
          slotName: "search",
          span: 8,
          labelWidth: "0",
        },
      ];
    },
    addConfig(){
      return[
        {
          key:"name",
          label:'姓名：',
          component:'el-input',
          span:12,
          props:{
            placeholder:"请输入姓名",
            clearable: true,
            prefixIcon:"el-icon-search"
          },
          tips:"<template slot='append'>.com</template>"
        },
        {
          key:"age",
          label:'年龄：',
          component:'el-input',
          span:12,
          props:{
            placeholder:"请输入年龄",
            clearable: true,
            // suffixIcon:"el-icon-date",
          },
          
        },
        {
          key:"character",
          label:'性格：',
          component:'innerText',
          span:12,
          innerText:'daa'
          // props:{
          //   placeholder:"请输入年龄",
          //   clearable: true,
          // }
        },
        {
          key:"sex",
          label:'性别：',
          component:'el-radio-group',
          span:12,
          data:[
            {
              value:"0",
              label:"男"
            },
            {
              value:"1",
              label:"女"
            }
          ]
        }
      ]
    }
  },
  methods:{
    addForm(){
      this.popObj.dialogVisible = true
      this.resetAddForm()
    },
    resetSearchForm(){
      console.log(this.$data.searchForm)
      Object.assign(this.$data.searchForm, this.$options.data().searchForm);
    },
    resetAddForm(){
      Object.assign(this.$data.addFormData, this.$options.data().addFormData);
    },
    cancelPop(){
      this.popObj.dialogVisible = false
    },
    async confirmPop(){
      const valid =await this.$refs.addForm.validate()
      console.log(valid)
    }
  }
};
</script>