<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="30%"
      append-to-body
    >
      <div class="dialog-content">
        <el-form
          label-position="right"
          label-width="100"
          :rules="formRule"
          :model="formData"
          ref="formRef"
        >
          <el-form-item label="金额" prop="amount">
            <el-input v-model.number="formData.amount" placeholder="请输入充值金额" />
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
  import { TenantService } from '@/services';
  import { validateInt } from '@/validator';
  const dialogVisible = ref(false);
  const title = ref('充值');
  const cancelHandler = () => {
    formData.value = {
      tenantId: null,
      amount: null,
    };
    dialogVisible.value = false;
  };
  const openDialog = (rowData = {}) => {
    formData.value.tenantId = rowData.id;
    dialogVisible.value = true;
  };
  const formRule = ref({
    amount: [
      {
        required: true,
        message: `充值金额必填`,
        trigger: ['change', 'blur'],
      },
      { validator: validateInt, trigger: ['change', 'blur'] },
    ],
  });
  const formData = ref({
    tenantId: null,
    amount: null,
  });
  const formRef = ref(null);
  const emit = defineEmits(['updateTable']);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        console.log(formData.value, '1');
        await TenantService.rechargeApi(formData.value);
        ElMessage.success('充值成功');
        emit('updateTable');
        cancelHandler();
      } else {
        ElMessage.error('请补充数据');
      }
    });
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
