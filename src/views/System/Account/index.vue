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
        <el-button type="primary" @click="dispatchRoleHandler">分配角色</el-button>
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
    <!-- 分配角色弹框 -->
    <AccountRoleDialog ref="accountRoleDialogRef" @updateTable="initTableData"></AccountRoleDialog>
  </div>
</template>

<script setup>
  import { AccountService, DepartmentService } from '@/services';
  import { tableOptions, queryFormOption } from './index.js';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AccountRoleDialog from './components/AccountRoleDialog.vue';
  import { getTreeList } from '@/utils';

  const route = useRoute();
  console.log(route.query.tenantId, '???');
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
    } = await AccountService.getPageApi({ ...queryOption, tenantId: route.query.tenantId });
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
    username: '',
    sort: 1,
  });
  const isVisibleDialog = ref(false);
  const title = ref('');
  const addNewHandler = async () => {
    await initAccountList();
    await initDepartment();
    title.value = '新增账号';
    isVisibleDialog.value = true;
    formData.value = {
      username: null,
      sort: null,
    };
  };

  // 编辑
  const editRowHandler = async (rowData) => {
    if (multipleSelection.value.length == 1) {
      await initAccountList();
      await initDepartment();
      const rowData = multipleSelection.value[0];
      title.value = '编辑账号';
      formData.value = rowData;
      isVisibleDialog.value = true;
    } else {
      ElMessage.warning('只能选择一行操作');
    }
  };
  const getFormData = async (formData) => {
    if (multipleSelection.value.length) {
      // 编辑
      await AccountService.modifyByIdApi(multipleSelection.value[0].id, formData);
      ElMessage.success('修改成功');
    } else {
      // 新增
      await AccountService.createApi(formData);
      ElMessage.success('新增成功');
    }
    isVisibleDialog.value = false;
    initTableData();
    formData.value = {
      username: null,
      sort: null,
    };
  };
  // 删除操作
  const deleteRowHandler = () => {
    if (multipleSelection.value.length) {
      ElMessageBox.confirm('确定要删除', '删除提示').then(async () => {
        const idList = multipleSelection.value.map((item) => item.id);
        await AccountService.batchDeleteByIdListApi(idList);
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
      await AccountService.batchStatusByIdListApi(idList);
      ElMessage.success('修改成功');
      initTableData();
    } else {
      ElMessage.warning('请选择行操作');
    }
  };

  // 初始化父节点下拉框
  const parentList = ref([]);
  const initAccountList = async () => {
    const { result } = await AccountService.getListApi();
    console.log(result);
    const list = result.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.username,
      };
    });
    parentList.value = getTreeList(list, 'id', 'parentId');
  };

  const departmentList = ref([]);
  const initDepartment = async () => {
    const { result } = await DepartmentService.getListApi();
    const list = [
      {
        id: -1,
        value: -1,
        label: '顶级部门',
        parentId: 0,
      },
      ...result.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.title,
        };
      }),
    ];
    departmentList.value = getTreeList(list, 'id', 'parentId');
  };
  const formOption = ref([
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
      required: true,
    },
    {
      type: 'treeSelect',
      label: '父节点',
      prop: 'parentId',
      data: parentList,
      attrs: {
        style: {
          width: '100%',
        },
        clearable: true,
      },
    },
    {
      type: 'treeSelect',
      label: '部门',
      prop: 'departmentId',
      data: departmentList,
      attrs: {
        style: {
          width: '100%',
        },
        clearable: true,
      },
    },
    {
      type: 'number',
      label: '排序',
      prop: 'sort',
    },
  ]);

  // 分配角色
  const accountRoleDialogRef = ref(null);
  const dispatchRoleHandler = () => {
    if (multipleSelection.value.length) {
      accountRoleDialogRef.value.openDialog(multipleSelection.value[0]);
    } else {
      ElMessage.warning('请选择行操作');
    }
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
