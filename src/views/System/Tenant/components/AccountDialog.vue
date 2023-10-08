<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="60%"
      append-to-body
    >
      <div class="dialog-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="加载中..."
        >
          <el-table-column prop="name" label="昵称" width="120" />
          <el-table-column prop="mobile" label="手机号" width="120" />
          <el-table-column prop="isPrimary" label="是否为主账号" align="center" width="120">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.isPrimary == 1">是</el-tag>
              <el-tag type="info" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template #default="scope">
              <el-tag type="danger" v-if="scope.row.status == 1">禁用</el-tag>
              <el-tag type="success" v-else>正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" width="180" align="center">
            <template #default="scope">
              <span>{{ formatDateStr(scope.row.createdAt, true) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="180" align="center" fixed="right">
            <template #default="scope">
              <el-button
                :type="scope.row.status == 1 ? 'info' : 'danger'"
                size="small"
                @click="modifyStatusHandler(scope.row)"
                >{{ scope.row.status == 1 ? '正常' : '禁用' }}</el-button
              >
              <el-button type="danger" size="small" @click="resetPasswordRowHandler(scope.row)"
                >重置密码</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
  import { AccountService } from '@/services';
  import { formatDate } from '@/utils';
  const formatDateStr = (data, isDue) => formatDate(data, isDue);
  const dialogVisible = ref(false);
  const title = ref('账号列表');
  const tableData = ref([]);
  const loading = ref(false);
  const openDialog = async (rowData = {}) => {
    await initAdminAccount(rowData.id);
    dialogVisible.value = true;
  };
  const initAdminAccount = async (tenantId) => {
    const {
      result: { data },
    } = await AccountService.getPageApi({ tenantId, pageSize: 100 });
    tableData.value = data;
  };
  // 重置密码
  const resetPasswordRowHandler = (rowData = {}) => {
    ElMessageBox.confirm('确定要重置为默认密码', '提示').then(async () => {
      await AccountService.resetPasswordApi(rowData.id);
      ElMessage.success('重置成功');
      dialogVisible.value = false;
    });
  };
  const modifyStatusHandler = async (rowData = {}) => {
    await AccountService.modifyStatusByIdApi(rowData.id);
    ElMessage.success('修改成功');
    dialogVisible.value = false;
  };
  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
