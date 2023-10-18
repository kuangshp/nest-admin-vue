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
  import { DepartmentService, AccountService } from '@/services';
  import { useRoute } from 'vue-router';
  import { getTreeList } from '@/utils';

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

  const initAccount = async () => {
    const { result } = await AccountService.getListApi();
    accountList.value = result.map((item) => {
      return {
        type: 'option',
        label: item.username,
        value: item.id,
      };
    });
  };
  // 新增
  const accountList = ref([]);
  const departmentList = ref([
    {
      value: '1',
      label: 'Level one 1',
      children: [
        {
          value: '1-1',
          label: 'Level two 1-1',
          children: [
            {
              value: '1-1-1',
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
  ]);
  const title = ref('新增部门');
  const isVisibleDialog = ref(false);
  const formOptionList = formOption(departmentList, accountList);
  const formData = ref({
    parentId: '',
    title: '',
    name: '',
    mobile: '',
    email: '',
    sort: '',
    description: '',
  });
  const addNewHandler = async () => {
    title.value = '新增部门';
    await initDepartment();
    await initAccount();
    isVisibleDialog.value = true;
  };
  const editRowHandler = async () => {
    if (multipleSelection.value.length) {
      title.value = '编辑部门';
      await initDepartment();
      await initAccount();
      formData.value = {
        ...multipleSelection.value[0],
        parentId: multipleSelection.value[0].parentId ?? -1,
      };
      isVisibleDialog.value = true;
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  // 提交
  const getFormData = async (formData) => {
    console.log(formData);
    if (multipleSelection.value.length) {
      await DepartmentService.modifyByIdApi(multipleSelection.value[0].id, formData);
    } else {
      await DepartmentService.createApi(formData);
    }
    isVisibleDialog.value = false;
    initTableData();
  };

  // 修改状态
  const modifyStatusHandler = async () => {
    if (multipleSelection.value.length) {
      await DepartmentService.batchStatusByIdListApi(
        multipleSelection.value.map((item) => item.id)
      );
      initTableData();
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  // 删除行
  const deleteRowHandler = async () => {
    if (multipleSelection.value.length) {
      await DepartmentService.batchDeleteByIdListApi(
        multipleSelection.value.map((item) => item.id)
      );
      initTableData();
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
