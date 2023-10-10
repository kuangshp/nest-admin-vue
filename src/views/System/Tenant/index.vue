<template>
  <div>
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
        <el-button type="primary" @click="addDefaultAccountHandler">创建账号</el-button>
        <el-button type="primary" @click="rechargeHandler">充值</el-button>
        <el-button type="primary" @click="editRowHandler">编辑</el-button>
        <el-button type="danger" @click="modifyStatusHandler">状态</el-button>
        <el-button type="danger" @click="deleteRowHandler">删除</el-button>
      </template>
      <template #accountTotal="{ scope }">
        <el-tag type="success" style="cursor: pointer" @click="toLinkAccountDetail(scope.row)">{{
          scope.row.accountTotal ?? 0
        }}</el-tag>
      </template>
      <template #balance="{ scope }">
        <el-tag type="success" style="cursor: pointer" @click="toLinkBalanceDetail(scope.row)">{{
          scope.row.balance
        }}</el-tag>
      </template>
    </CustomTable>
    <!-- 添加和编辑弹框 -->
    <TenantDialog ref="tenantDialogRef" @updateTable="initTableData"></TenantDialog>
    <RechargeDialog ref="rechargeDialogRef" @updateTable="initTableData"></RechargeDialog>
    <!-- 新增账号 -->
    <FormDialog
      title="新增账号"
      v-model:visible="isVisibleDialog"
      :options="formOption"
      :formData="formData"
      @getFormData="getFormData"
    ></FormDialog>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { tableOptions, queryFormOption } from './index.js';
  import TenantDialog from './components/TenantDialog.vue';
  import RechargeDialog from './components/RechargeDialog.vue';
  import { TenantService } from '@/services';
  import { useRouter } from 'vue-router';
  import { ElMessage, ElMessageBox } from 'element-plus';

  const router = useRouter();
  const tableData = ref([]);
  const pageTotal = ref(0);
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
    } = await TenantService.getPageApi(queryOption);
    tableData.value = data;
    pageTotal.value = total;
    multipleSelection.value = [];
  };
  // 分页操作
  const changePageHandler = ({ pageSize, pageNumber }) => {
    initTableData({ pageSize: pageSize, pageNumber: pageNumber });
  };

  // 新增
  const tenantDialogRef = ref(null);
  const addNewHandler = async () => {
    tenantDialogRef.value.openDialog();
  };

  // 编辑
  const editRowHandler = async (rowData) => {
    if (multipleSelection.value.length == 1) {
      tenantDialogRef.value.openDialog(multipleSelection.value[0]);
    } else {
      ElMessage.warning('只能选择一行操作');
    }
  };
  // 删除操作
  const deleteRowHandler = () => {
    if (multipleSelection.value.length) {
      ElMessageBox.confirm('确定要删除', '删除提示').then(async () => {
        const idList = multipleSelection.value.map((item) => item.id);
        await TenantService.batchDeleteByIdListApi(idList);
        ElMessage.success('删除成功');
        initTableData();
      });
    } else {
      ElMessage.warning('请选择行操作');
    }
  };

  // 充值
  const rechargeDialogRef = ref(null);
  const rechargeHandler = (rowData) => {
    if (multipleSelection.value.length == 1) {
      rechargeDialogRef.value.openDialog(multipleSelection.value[0]);
    } else {
      ElMessage.warning('只能选择一行操作');
    }
  };
  // 查看团队成员
  const accountDialogRef = ref(null);
  const toLinkAccountDetail = (rowData) => {
    router.push({ path: '/system/account', query: { tenantId: rowData.id } });
  };
  // 查看余额
  const toLinkBalanceDetail = (rowData) => {
    router.push({ path: '/record/balance', query: { tenantId: rowData.id } });
  };
  // 修改状态
  const modifyStatusHandler = async () => {
    if (multipleSelection.value.length) {
      const idList = multipleSelection.value.map((item) => item.id);
      await TenantService.batchStatusByIdListApi(idList);
      ElMessage.success('修改成功');
      initTableData();
    } else {
      ElMessage.warning('请选择行操作');
    }
  };
  // 新增账号
  const isVisibleDialog = ref(false);
  const formOption = ref([
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
      required: true,
    },
    {
      type: 'number',
      label: '排序',
      prop: 'sort',
    },
  ]);
  const formData = ref({
    username: '',
    sort: '',
  });
  const addDefaultAccountHandler = async () => {
    if (multipleSelection.value.length) {
      isVisibleDialog.value = true;
    } else {
      ElMessage.warning('请选择行操作');
    }
  };
  // 提交
  const getFormData = async (formData) => {
    await TenantService.defaultAccountApi({ ...formData, tenantId: multipleSelection.value[0].id });
    ElMessage.success('修改成功');
    initTableData();
    isVisibleDialog.value = false;
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
