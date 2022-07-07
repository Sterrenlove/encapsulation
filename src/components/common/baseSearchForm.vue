<template>
  <div class="ces-search">
    <el-form
      class="input"
      inline
    >
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in searchForm" :key="item.prop">
          <el-form-item
            :label="item.label"
          >
            <!-- input -->
            <el-input
              v-if="item.type === 'Input'"
              v-model="searchData[item.prop]"
              clearable
              :width="item.width"
              :placeholder="item.placeholder"
              @clear="clearParams('searchData[item.prop]')"
            />
            <!-- 下拉框 -->
            <el-select
              v-if="item.type === 'Select'"
              v-model="searchData[item.prop]"
              filterable
              clearable
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="(op, index) in item.options"
                :key="index"
                :label="op.label"
                :value="op.value"
              />
            </el-select>
            <!-- 单选框 -->
            <el-radio-group
              v-if="item.type === 'Radio'"
              v-model="searchData[item.prop]"
            >
              <el-radio
                v-for="ra in item.radios"
                :key="ra.value"
                :label="ra.value"
                >{{ ra.label }}</el-radio
              >
            </el-radio-group>
            <!-- 单选组 -->
            <el-radio-group
              v-if="item.type === 'RadioButton'"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])"
            >
              <el-radio-button
                v-for="ra in item.radios"
                :key="ra.value"
                :label="ra.value"
                >{{ ra.label }}</el-radio-button
              >
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox'"
              v-model="searchData[item.prop]"
            >
              <el-checkbox
                v-for="ch in item.checkboxs"
                :key="ch.value"
                :label="ch.value"
                >{{ ch.label }}</el-checkbox
              >
            </el-checkbox-group>
            <!-- 日期 -->
            <el-date-picker
              v-if="item.type === 'year'"
              v-model="searchData[item.prop]"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="year"
              placeholder="选择年"
              @change="item.change(searchData[item.prop])"
            >
            </el-date-picker>
            <el-date-picker
              v-if="item.type === 'Date'"
              v-model="searchData[item.prop]"
            />
            <el-time-select
              v-if="item.type === 'Time'"
              v-model="searchData[item.prop]"
              type=""
            />
            <el-date-picker
              v-if="item.type === 'DateTime'"
              v-model="searchData[item.prop]"
              type="datetime"
              :disabled="item.disable && item.disable(searchData[item.prop])"
            />
            <el-date-picker
              v-if="item.type === 'daterange'"
              v-model="searchData[item.prop]"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-date-picker
              v-if="item.type === 'monthrange'"
              v-model="searchData[item.prop]"
              type="monthrange"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            >
            </el-date-picker>

            <el-date-picker
              v-if="item.type === 'datetimerange'"
              v-model="searchData[item.prop]"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="item.change(searchData[item.prop])"
            >
            </el-date-picker>
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch'"
              v-model="searchData[item.prop]"
            />
          </el-form-item>
        </el-col>
        <el-form-item v-for="item in searchHandle" :key="item.label" class="handleBtn">
        <el-button
          v-if="isHandle"
          :class="item.class"
          :type="item.type"
          :icon="item.icon"
          :size="item.size || size"
          @click="item.handle()"
          >{{ item.label }}</el-button
        >
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    size: {
      type: String,
      default: "mini",
    },
    searchForm: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  },
  data() {
    return {
      // defaultSize: "mini",
    };
  },
  methods: {
    // 置空参数
    clearParams(val) {
      // eslint-disable-next-line no-return-assign
      Object.keys(this.searchData).forEach(
        (key) => (this.searchData[key] = "")
      );
    },
  },
};
</script>
<style lang='scss' scoped>
.handleBtn{
  float: right;
}
</style>
