<template>
  <div class="nx-form">
    <el-form ref="form" v-bind="$attrs" :model="source" class="nx-form" :rules="rules">
      <el-row :gutter="20">
        <el-col
          v-for="item in config"
          :key="item.key"
          :span="item.hidden ? 0 : item.span || 8"
        >
          <el-form-item
            v-if="!item.hidden"
            :label="item.label"
            :prop="item.key"
            :label-width="item.labelWidth || '90px'"
            v-bind="item.itemProps"
          >
            <slot v-if="item.component === 'slot'" :name="item.slotName"></slot>
            <div
              v-else-if="item.component === 'innerText'"
              :class="item.innerClass"
              :style="item.style"
            >
              {{ item.innerText || source[item.key] }}
            </div>
            <template v-else>
              <div class="nx-flex-align-center">
                <component
                  :is="item.component"
                  v-model="source[item.key]"
                  style="width: 100%; flex: 1"
                  v-bind="item.props"
                  v-on="item.listeners"
                >
                  <template v-if="item.component === 'el-radio-group'">
                    <el-radio
                      v-for="(radio, radioIndex) in item.data"
                      :key="radioIndex"
                      style="margin-top: 10px"
                      :label="radio.value"
                      :disabled="radio.disabled"
                    >
                      {{ radio.label }}
                    </el-radio>
                  </template>

                  <template v-if="item.component === 'el-checkbox-group'">
                    <el-checkbox
                      v-for="(checkbox, checkboxIndex) in item.data"
                      :key="checkboxIndex"
                      :label="checkbox.value"
                    >
                      {{ checkbox.label }}
                    </el-checkbox>
                  </template>

                  <template v-if="item.component === 'el-select'">
                    <el-option
                      v-for="(option, optionIndex) in item.data"
                      :key="optionIndex"
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </component>
                <div v-if="item.after" class="nx-form__after">
                  {{ item.after }}
                </div>
              </div>
              <div
                v-if="item.tips"
                class="nx-form__tips"
                v-html="item.tips"
              ></div>
            </template>
          </el-form-item>
          <!-- <div
            v-if="item.tips"
            :style="{ marginLeft: item.labelWidth || '120px' }"
            class="nx-form__tips"
            v-html="item.tips"
          ></div> -->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "NxForm",
  components: {},
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    source: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    reset() {
      debugger;
      this.$refs.form.resetFields();
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    async validate() {
      let res = false;
      await this.$refs.form.validate((valid) => {
        if (valid) res = true
      });
      return res
    },
  },
};
</script>
