<template>
  <div class="department">
    <!-- 搜索区域 -->
    <CustomForm :options="queryFormOption" @queryHandler="queryHandler"></CustomForm>

    <!-- 表格区域 -->
    <CustomTable
      :options="tableOptions"
      :data="tableData"
      :total="pageTotal"
      border
      style="margin-top: 20px"
      @changePageHandler="changePageHandler"
      @selection-change="handleSelectionChange"
    >
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
        <el-button type="primary" @click="editRowHandler">编辑</el-button>
        <el-button type="primary" @click="dispatchRoleHandler">分配角色</el-button>
        <el-button type="danger" @click="modifyStatusHandler">状态</el-button>
        <el-button type="danger" @click="deleteRowHandler">删除</el-button>
      </template>
    </CustomTable>
    <!-- 新增/编辑部门 -->
    <FormDialog
      :title="title"
      v-model:visible="isVisibleDialog"
      :options="formOptionList"
      :formData="formData"
      @getFormData="getFormData"
    ></FormDialog>
  </div>
</template>

<script setup>
  import { tableOptions, queryFormOption, formOption } from './index.js';
  import { DepartmentService } from '@/services';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const tableData = ref([]);
  const pageTotal = ref(0);
  // 搜索
  const queryHandler = (queryData) => {
    initTableData({ ...queryData, pageSize: 10, pageNumber: 1 });
  };

  // 多选操作
  const multipleSelection = ref([]);
  const handleSelectionChange = (val) => {
    multipleSelection.value = val;
  };

  // 获取表格数据
  const initTableData = async (queryOption = {}) => {
    const {
      result: { data, total },
    } = await DepartmentService.getPageApi({ ...queryOption, tenantId: route.query.tenantId });
    tableData.value = data;
    pageTotal.value = total;
    multipleSelection.value = [];
  };
  // 分页操作
  const changePageHandler = ({ pageSize, pageNumber }) => {
    initTableData({ pageSize: pageSize, pageNumber: pageNumber });
  };

  // 新增
  const departmentList = ref([]);
  const title = ref('新增部门');
  const isVisibleDialog = ref(false);
  const formOptionList = formOption(departmentList.value);
  const formData = ref({
    title: '',
  });
  const addNewHandler = () => {
    title.value = '新增部门';
    isVisibleDialog.value = true;
  };
  const editRowHandler = () => {
    title.value = '编辑部门';
    isVisibleDialog.value = true;
  };
  // 提交
  const getFormData = () => {};
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
