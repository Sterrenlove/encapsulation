
<template>
  <div class="table-wrap">
    <el-table
      v-loading="columObj.loading"
      ref="listTable"
      :class="`list-table`"
      :data="columObj.tableData"
      border
      stripe
      height="100%"
      header-cell-class-name="table_header"
      @select="handleSelectionChange"
      style="width: 100%"
      @row-click="rowClick"
    >
    <!-- 是否需要复选框 -->
      <el-table-column
        v-if="columObj.isSelect"
        type="selection"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column v-if="columObj.isSerial" type="index" :label="'序号'" width="50">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columObj.tableCol"
        :key="index"
        :show-overflow-tooltip="true"
        :align="item.align || 'left'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div v-html="item.ownDefinedReturn(scope.row)" v-if="item.ownDefined"></div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <!-- 多级表头插槽  示例:<template v-slot:multistageHeader></template> -->
      <slot name="multistageHeader"></slot>
      <el-table-column :label="columObj.operationText || '操作'" v-if="columObj.isOperation">
        <!-- 操作按钮需要放在模板标签里面: 例:"<template scope="scopeVal" v-slot:operation><button @click="edit(scopeVal)">编辑</button></template>"  -->
        <template slot-scope="scope">
          <slot :scope="scope" name="operation"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page_div" v-if="columObj.isPagination">
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
  props: {
    columObj: {
      type: Object,
      required: true,
    },
    pageObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    handleSelectionChange(val, row) {
			let isPick = val.findIndex(oo => oo.id === row.id) > -1;
			this.$emit("tableMultipleSelection", row, isPick);
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

::v-deep .table_header {
  background: #f2f2f2 !important;
  color: #3f3358;
}
</style>