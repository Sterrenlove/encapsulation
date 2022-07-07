
<template>
  <div>
    <el-table
      size="medium"
      :lazy="true"
      :data="tableData"
      :stripe="true"
      :border="false"
      :fit="true"
      :show-header="true"
      :max-height="470"
      v-loading="columObj.loading"
      :row-class-name="tableRowClassName"
      @row-click="rowClick"
      header-cell-class-name="table_header"
      class="pubTable"
    >
      <!-- 选择框是否开启，selectable控制是否单行禁用 -->
      <el-table-column
        v-if="columObj.selection"
        type="selection"
        :selectable="columObj.selectable"
      >
        <!-- 字组件使用 -->
        <!-- selectable: (row, index) => {
          if (row.switchs) {
            return true;
          }
        }, -->
      </el-table-column>
      <el-table-column
        v-if="columObj.showIndex"
        label="序号"
        width="90"
        type="index"
      ></el-table-column>
      <!-- 普通列 -->
      <el-table-column
        v-for="(column, columIndex) in columObj.columnData"
        :key="columIndex"
        :type="column.type"
        :prop="column.prop"
        :label="column.label"
        :width="column.width "
        :fixed="column.fixed"
        :align="column.align || 'left'"
        :sortable="column.sortable || false"
        :index="columIndex"
        show-overflow-tooltip
      >
        <template slot-scope="{ row, $index }">
          <!-- 默认展示 -->
          <span>{{ row[column.prop] }}</span>
          <!-- 状态对象展示 -->
          <span v-if="column.status && row[column.prop]">{{
            row[column.prop].msg
          }}</span>
          <!-- 自定义内容 -->
          <span
            v-if="column.ownDefined"
            v-html="column.ownDefinedReturn(row, $index)"
            ></span
          >
          <!-- switch开关 -->
          <el-switch
            v-if="column.switch"
            v-model="row[column.prop]"
            :inactive-text="
              row[column.prop] ? column.openText : column.closeText
            "
            @change="switchChange(row, $index, column.prop)"
          ></el-switch>

          <!-- 可编辑input，仅在text默认展示类型才可编辑-->
          <el-input
            v-focus
            v-if="column.editRow == $index && column.text"
            v-model="row[column.prop]"
            @blur="editInputBlur(row, $index, column.prop, columIndex)"
          ></el-input>
          <!-- 操作按钮 -->

          <span v-if="column.isOperation || true">
            <span v-for="(operations, index) in column.operation" :key="index">
              <el-button
                type="text"
                v-if="operations.show || true"
                :icon="operations.icon"
                @click="operations.funName(row, $index)"
                :style="{ color: operations.color }"
                size="small"
                >{{ operations.label }}</el-button
              >
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div
      class="page_div"
      v-if="isPagination"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pageData.pageNum"
        :pager-count="7"
        :page-sizes="[13, 20, 30, 40]"
        :page-size="pageObj.pageData.pageSize"
        layout="total,sizes,prev, pager, next,jumper"
        :total="pageObj.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
 
<script>
export default {
  directives: {
    // 自定义指令,用于可编辑input自动获取焦点
    focus: {
      inserted: function (e) {
        e.querySelector("input").focus();
      },
    },
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columObj: {
      type: Object,
      required: true,
    },
    //columObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
    //columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
    //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
    pageObj: {
      type: Object,
      required: true,
    },
    isPagination: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // // 行操作
    // rowOperation(row, $index, now) {
    //   this.$emit("rowOperation", row, $index, now());
    // },
    // switchChange调用
    switchChange(row, $index, prop) {
      this.$emit("switchChange", row, $index, prop);
    },
    // 帮助点击行，获取点击的下标
    tableRowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    // 可编辑input失去焦点
    editInputBlur(row, $index, prop, columIndex) {
      this.$emit("editInputBlur", row, $index, prop, columIndex);
    },
    // 条数变化
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.page_div {
  position: absolute;
  right: 60px;
  bottom: 60px;
}
.pubTable{
 border: 1px solid #e9e9e9;
 border-bottom: 0;
}
::v-deep .table_header{
  background: #f2f2f2!important;
  color: #3f3358;
}
</style>