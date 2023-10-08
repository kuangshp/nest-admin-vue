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
        <el-form
          label-position="right"
          label-width="100"
          :rules="formRule"
          :model="formData"
          ref="formRef"
        >
          <el-form-item label="商户名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入商户名称" />
          </el-form-item>
          <el-form-item label="联系人" prop="username">
            <el-input v-model="formData.username" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <InputNumber v-model.number="formData.sort" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="formData.description" placeholder="请输入描述" />
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
  import { formatDate } from '@/utils';
  const dialogVisible = ref(false);
  const title = ref('创建商户');
  const formData = ref({
    name: null,
    username: null,
    mobile: null,
    sort: null,
    description: null,
  });
  const cancelHandler = () => {
    formData.value = {
      name: null,
      username: null,
      mobile: null,
      sort: null,
      description: null,
    };
    dialogVisible.value = false;
  };
  const newRowDate = ref(null);
  const openDialog = async (rowData = {}) => {
    if (!Object.keys(rowData).length) {
      newRowDate.value = null;
      title.value = '创建商户';
      formData.value = {
        name: null,
        username: null,
        mobile: null,
        sort: null,
        description: null,
      };
    } else {
      newRowDate.value = rowData;
      title.value = '编辑商户';
      formData.value = {
        name: rowData.name,
        username: rowData.username,
        mobile: rowData.mobile,
        sort: rowData.sort,
        description: rowData.description,
      };
    }
    dialogVisible.value = true;
  };
  const formRule = ref({
    name: [
      {
        required: true,
        message: `商户名称必填`,
        trigger: ['change', 'blur'],
      },
    ],
    username: [
      {
        required: true,
        message: `联系人必填`,
        trigger: ['change', 'blur'],
      },
    ],
    mobile: [
      {
        required: true,
        message: `手机号码必填`,
        trigger: ['change', 'blur'],
      },
    ],
  });

  const formRef = ref(null);
  const emit = defineEmits(['updateTable']);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          sort: formData.value.sort ? formData.value.sort : 1,
        };
        if (newRowDate.value && Object.keys(newRowDate.value).length) {
          await TenantService.modifyByIdApi(newRowDate.value.id, postData);
          ElMessage.success('修改成功');
        } else {
          await TenantService.createApi(postData);
          ElMessage.success('创建成功');
        }
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
