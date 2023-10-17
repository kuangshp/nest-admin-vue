<template>
  <div class="tree-select">
    <treeselect
      v-model="defaultValue"
      :options="options"
      :multiple="multiple"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxHeight="200"
      :clearable="clearable || true"
      @select="selectNode"
      @deselect="delSelect"
      @input="inputNode"
    />
  </div>
</template>

<script>
  import Treeselect from 'vue3-treeselect';
  import 'vue3-treeselect/dist/vue3-treeselect.css';

  export default {
    name: 'TreeSelect',
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      options: {
        type: Array,
        default: () => [],
      },
      value: {
        type: String | Number | Array,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        defaultValue: this.value || this.value == 'null' ? null : this.value,
      };
    },
    methods: {
      //清空
      clearableValue() {
        this.$emit('input', null);
      },
      selectNode(node) {
        console.log(node, '11111111111', node.id);
        debugger;
        this.$emit('input', node.id);
      },
      delSelect(node) {
        console.log(node, '???');
      },
      inputNode(value) {
        console.log(value, '===');
        this.$emit('input', value);
      },
    },
    components: {
      Treeselect,
    },
  };
</script>
<style scoped lang="scss">
  .tree-select {
    width: 200px;
    height: 30px;
    ::v-deep {
      .vue-treeselect__placeholder {
        line-height: 30px !important;
        font-size: 14px;
        padding-left: 10px;
      }

      .vue-treeselect__control {
        height: 30px;
        padding-left: 0;
        padding-right: 0;
        border-radius: 3px;
      }
      .vue-treeselect__single-value {
        line-height: 28px;
        font-size: 14px;
        padding-left: 10px;
      }
      .vue-treeselect__multi-value {
        height: 28px;
        margin-bottom: 0px;
        margin-left: 10px;
        white-space: nowrap; /* 禁止换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 使用省略号显示超出部分 */
      }
      .vue-treeselect__multi-value-item-container {
        padding-top: 3px;
      }
    }
  }
</style>
