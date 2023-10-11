<template>
  <div class="account">
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
        <el-button type="primary" @click="editRowHandler">分配资源</el-button>
        <el-button type="danger" @click="modifyStatusHandler">状态</el-button>
        <el-button type="danger" @click="deleteRowHandler">删除</el-button>
      </template>
      <template #accountTotal="{ scope }">
        <el-tag type="success" style="cursor: pointer" @click="toLinkAccountDetail(scope.row)">{{
          scope.row.accountTotal
        }}</el-tag>
      </template>
      <template #balance="{ scope }">
        <el-tag type="success" style="cursor: pointer" @click="toLinkBalanceDetail(scope.row)">{{
          scope.row.balance
        }}</el-tag>
      </template>
    </CustomTable>
    <!-- 创建弹框 -->
    <FormDialog
      :title="title"
      v-model:visible="isVisibleDialog"
      :options="formOption"
      :formData="formData"
      @getFormData="getFormData"
    ></FormDialog>
  </div>
</template>

<script setup>
  import { RoleService } from '@/services';
  import { tableOptions, queryFormOption, formOption } from './index.js';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { ref } from 'vue';
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
    } = await RoleService.getPageApi({ ...queryOption });
    tableData.value = data;
    pageTotal.value = total;
    multipleSelection.value = [];
  };
  // 分页操作
  const changePageHandler = ({ pageSize, pageNumber }) => {
    initTableData({ pageSize: pageSize, pageNumber: pageNumber });
  };

  // 新增

  const formData = ref({
    name: '',
    sort: 1,
    description: '',
  });
  const isVisibleDialog = ref(false);
  const title = ref('');
  const addNewHandler = async () => {
    title.value = '新增角色';
    isVisibleDialog.value = true;
    multipleSelection.value = [];
    formData.value = {
      name: null,
      sort: null,
      description: null,
    };
  };

  // 编辑
  const editRowHandler = async (rowData) => {
    if (multipleSelection.value.length == 1) {
      const rowData = multipleSelection.value[0];
      title.value = '编辑账号';
      formData.value = {
        name: rowData.name,
        sort: rowData.sort,
        description: rowData.description,
      };
      isVisibleDialog.value = true;
    } else {
      ElMessage.warning('只能选择一行操作');
    }
  };
  const getFormData = async (formData) => {
    if (multipleSelection.value.length) {
      // 编辑
      await RoleService.modifyByIdApi(multipleSelection.value[0].id, formData);
      ElMessage.success('修改成功');
    } else {
      // 新增
      await RoleService.createApi(formData);
      ElMessage.success('新增成功');
    }
    isVisibleDialog.value = false;
    initTableData();
    formData.value = {
      name: null,
      sort: null,
      description: null,
    };
  };
  // 删除操作
  const deleteRowHandler = () => {
    if (multipleSelection.value.length) {
      ElMessageBox.confirm('确定要删除', '删除提示').then(async () => {
        const idList = multipleSelection.value.map((item) => item.id);
        await RoleService.batchDeleteByIdListApi(idList);
        ElMessage.success('删除成功');
        initTableData();
      });
    } else {
      ElMessage.warning('请选择行操作');
    }
  };

  // 修改状态
  const modifyStatusHandler = async () => {
    if (multipleSelection.value.length) {
      const idList = multipleSelection.value.map((item) => item.id);
      await RoleService.batchStatusByIdListApi(idList);
      ElMessage.success('修改成功');
      initTableData();
    } else {
      ElMessage.warning('请选择行操作');
    }
  };

  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
