<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="50%"
      append-to-body
    >
      <div class="dialog-content">
        <el-form :model="formData" label-width="100">
          <el-form-item label="用户名">
            <el-input v-model="formData.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属集团">
            <el-input v-model="formData.tenantName" disabled></el-input>
          </el-form-item>
          <!-- 展示全部的角色 -->
          <el-form-item label="角色">
            <el-checkbox-group v-model="formData.roleIdList">
              <el-checkbox :label="item.id" v-for="(item, index) of roleList" :key="index">{{
                item.name
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandler">取消</el-button>
          <el-button type="primary" @click="confirmHandler">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { AccountRoleService } from '@/services';
  const dialogVisible = ref(false);
  const title = ref('分配角色');
  const loading = ref(false);
  const formData = ref({});
  const emits = defineEmits(['updateTable']);
  const openDialog = async (rowData = {}) => {
    console.log(rowData);
    // TODO 这个必须放到最前面不然选中不能实现
    dialogVisible.value = true;
    formData.value = rowData;
    await initRoleList();
    await initCheckedRole(rowData.id);
  };

  const cancelHandler = () => {
    dialogVisible.value = false;
  };
  const confirmHandler = async () => {
    await AccountRoleService.distributionRoleApi({
      accountId: formData.value.id,
      roleList: formData.value.roleIdList,
    });
    cancelHandler();
    emits('updateTable');
  };
  // 获取全部的角色
  const roleList = ref([]);
  const initRoleList = async () => {
    const { result } = await AccountRoleService.getRoleListApi();
    roleList.value = result;
  };
  // 根据当前账号id查询已经选中的角色
  const initCheckedRole = async (accountId) => {
    const { result } = await AccountRoleService.getAccountByRoleIdApi(accountId);
    console.log(
      result,
      result.map((item) => item.id),
      '???'
    );
    formData.value.roleIdList = result.map((item) => item.id);
  };
  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
