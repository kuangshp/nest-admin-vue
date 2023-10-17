<!-- Vue SFC -->
<template>
  <div id="app">
    <div class="box">
      {{ value }}==
      <TreeSelect v-model="value" :options="options" placeholder="请选择" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <el-input v-model="value" placeholder="请选择"></el-input>
  </div>
</template>

<script>
  export default {
    // register the component
    // components: { Treeselect },
    methods: {
      changeHandler(value) {
        console.log(value, '???');
      },
    },
    data() {
      return {
        // define the default value
        value: null,
        // define options
        options: [
          {
            id: '1',
            label: 'a',
            children: [
              {
                id: '2',
                label: 'aa',
              },
              {
                id: '3',
                label: 'ab',
              },
            ],
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
          },
          {
            id: '7',
            label: 'e',
          },
          {
            id: '8',
            label: 'f',
          },
        ],
      };
    },
  };
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
