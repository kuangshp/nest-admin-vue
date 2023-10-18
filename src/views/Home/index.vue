<template>
  <div id="app">
    <div class="box">
      {{ value }}==
      <TreeSelect v-model="value" :options="options" placeholder="请选择" isMultiple />
    </div>
    <br />
    <br />
  </div>
</template>

<script setup>
  const options = ref([
    {
      id: '1',
      label: 'a',
    },
    {
      id: '2',
      label: 'aa',
      parentId: '1',
    },
    {
      id: '3',
      label: 'ab',
      parentId: '1',
    },
    {
      id: '4',
      label: 'b',
    },
    {
      id: '5',
      label: 'c',
    },
    {
      id: '6',
      label: 'd',
      parentId: '5',
    },
    {
      id: '7',
      label: 'e',
      parentId: '5',
    },
    {
      id: '8',
      label: 'f',
      parentId: '5',
    },
  ]);
  const value = ref(['1']);
</script>
<style scoped lang="scss">
  .box {
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
