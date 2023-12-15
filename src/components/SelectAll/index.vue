<template>
  <el-select v-model="ownValues" clearable required multiple filterable :collapse-tags="collapseTags"
             :allow-create="allowCreate" :size="size" :disabled="disabled"
             autocomplete="off" :placeholder="placeholder" :style="styleM" class="yw-select-all" @change="handleChange"
  >
    <el-option v-for="item in options" :key="item[valueKey]" :label="item[labelKey]" :value="item[valueKey]"
               :disabled="item[disabledKey]"
    />
  </el-select>
</template>

<script> /* eslint-disable */
export default {
  name: 'SelectAll',
  props: {
    allowCreate: {
      type: Boolean,
      required: false,
      default: false
    },
    collapseTags: {
      type: Boolean,
      required: false,
      default: true
    },
    styleM: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    disabledKey: {
      type: String,
      required: false,
      default: "disabled"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    valueKey: {
      type: String,
      required: false,
      default: "value"
    },
    labelKey: {
      type: String,
      required: false,
      default: "abel"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    value: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      allKey: '[@a@l@l@]',
      lastValues: [],
      ownValues: [],
      optionsLength: 0
    }
  },
  watch: {
    options: {
      handler: function () {
        this.init('watch')
      },
      immediate: false,
      deep: true
    },
    value: {
      handler: function () {
        this.init('value');
      },
      immediate: false,
      deep: true
    }
  },
  created() {
    this.init('created')
  },
  methods: {
    init(from) {
      if (this.options.length > 0) {
        if (typeof this.options[0][this.valueKey] === 'number') {
          this.allKey = -99999
        }
        this.lastValues = this.ownValues = JSON.parse(JSON.stringify(this.value));

        if (this.options[0][this.valueKey] !== this.allKey) {
          this.options.unshift({
            [this.valueKey]: this.allKey,
            [this.labelKey]: '全选'
          })
        }
        if (this.options.length - 1 === this.ownValues.length) {
          this.ownValues.push(this.allKey);
        }
        this.optionsLength = (this.options.filter(item => item[this.valueKey] !== this.allKey)).length
        // this.$emit('input', this.ownValues.filter(item => item !== this.allKey));
        // this.$emit('change', this.ownValues.filter(item => item !== this.allKey));
      } else {
        this.ownValues = [];
      }
      this.lastValues = this.ownValues;
    },
    handleChange() {
      let hasAllInValues = !!this.ownValues.find(item => item === this.allKey),
          hasAllInLastValues = !!this.lastValues.find(item => item === this.allKey);
      if (hasAllInValues && !hasAllInLastValues) {//全选
        this.ownValues = [];
        this.options.forEach(item => {
          this.ownValues.push(item[this.valueKey]);
        })
      } else if (!hasAllInValues && hasAllInLastValues) {//取消全选
        this.ownValues = Object.assign([])
      } else if (hasAllInValues && this.options.length !== this.ownValues.length) {//判断所有选项是否在
        this.ownValues = this.ownValues.filter(item => item !== this.allKey);
      } else if (!hasAllInValues && this.optionsLength === this.ownValues.length) {//判断所有选项是否在
        this.ownValues.push(this.allKey);
      }
      this.lastValues = this.ownValues;
      this.$emit('input', this.ownValues.filter(item => item !== this.allKey));
      this.$emit('change', this.ownValues.filter(item => item !== this.allKey))
    }
  }
}
</script>

<style scoped>
.yw-select-all >>> .el-select__tags >>> .el-tag >>> .el-select__tags-text {
  max-width: 70px;
  overflow: hidden;
  display: inline-block;
}
</style>
