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
    >
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
        <el-button type="primary" @click="rechargeHandler(scope.row)">充值</el-button>
        <el-button type="primary" @click="editRowHandler(scope.row)">编辑</el-button>
        <el-button type="danger" @click="rechargeHandler(scope.row)">状态</el-button>
        <el-button type="danger" @click="deleteRowHandler(scope.row)">删除</el-button>
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
      <template #action="{ scope }">
        <el-button
          size="small"
          :type="scope.row.status == 1 ? 'info' : 'danger'"
          @click="modifyStatusHandler(scope.row)"
          >{{ scope.row.status == 1 ? '正常' : '禁用' }}</el-button
        >
        <el-button size="small" type="primary" @click="rechargeHandler(scope.row)">充值</el-button>
        <el-button size="small" type="primary" @click="editRowHandler(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteRowHandler(scope.row)">删除</el-button>
      </template>
    </CustomTable>
    <!-- 添加和编辑弹框 -->
    <TenantDialog ref="tenantDialogRef" @updateTable="initTableData"></TenantDialog>
    <RechargeDialog ref="rechargeDialogRef" @updateTable="initTableData"></RechargeDialog>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { tableOptions, queryFormOption } from './index.js';
  import TenantDialog from './components/TenantDialog.vue';
  import RechargeDialog from './components/RechargeDialog.vue';
  import { TenantService } from '@/services';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const tableData = ref([]);
  const pageTotal = ref(0);
  const queryHandler = (queryData) => {
    initTableData({ ...queryData, pageSize: 10, pageNumber: 1 });
  };
  const tenantDialogRef = ref(null);
  const addNewHandler = async () => {
    tenantDialogRef.value.openDialog();
  };
  const editRowHandler = async (rowData) => {
    tenantDialogRef.value.openDialog(rowData);
  };
  // 删除操作
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '删除提示').then(async () => {
      await TenantService.deleteByIdApi(rowData.id);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
  // 获取表格数据
  const initTableData = async (queryOption = {}) => {
    const {
      result: { data, total },
    } = await TenantService.getPageApi(queryOption);
    tableData.value = data;
    pageTotal.value = total;
  };
  // 分页操作
  const changePageHandler = ({ pageSize, pageNumber }) => {
    initTableData({ pageSize: pageSize, pageNumber: pageNumber });
  };

  // 充值
  const rechargeDialogRef = ref(null);
  const rechargeHandler = (rowData) => {
    rechargeDialogRef.value.openDialog(rowData);
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
  const modifyStatusHandler = async (rowData) => {
    console.log(rowData);
    await TenantService.modifyStatusByIdApi(rowData.id);
    ElMessage.success('修改成功');
    initTableData();
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
