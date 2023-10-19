<template>
  <div style="background: #fff; padding: 20px">
    <div class="btn-group" style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <el-button type="primary" @click="addNewHandler">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="loadChildHandler"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :expand-row-keys="expandRowKeys"
      @expand-change="expandChangeHandler"
    >
      <el-table-column prop="title" label="名称" width="120" />
      <el-table-column prop="resourcesType" label="类型" align="center" width="100">
        <template #default="scope">
          <el-tag type="info" v-if="scope.row.resourcesType == 0">模块</el-tag>
          <el-tag type="info" v-else-if="scope.row.resourcesType == 1">菜单</el-tag>
          <el-tag type="info" v-else-if="scope.row.resourcesType == 2">按钮</el-tag>
          <el-tag type="info" v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL地址" width="170" />
      <el-table-column prop="method" label="请求方式" width="100" />
      <el-table-column prop="sort" label="排序" align="center" width="100" />
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 0">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="140" />
      <el-table-column prop="createdAt" label="创建时间" width="180" align="center">
        <template #default="scope">
          <span>{{ formatDateStr(scope.row.createdAt, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="220" align="center" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="modifyRowDataHandler(scope.row)"
            >编辑</el-button
          >
          <el-button type="info" size="small" @click="modifyRowStatusHandler(scope.row)"
            >状态</el-button
          >
          <el-button type="danger" size="small" @click="deleteRowHandler(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="pageTotal"
        @current-change="changePageHandler"
      />
    </div>
    <ResourcesDialog ref="resourcesDialogRef" @updateTable="refreshTable" />
  </div>
</template>

<script setup>
  import { ResourcesService } from '@/services';
  import { onMounted } from 'vue';
  import ResourcesDialog from './components/ResourcesDialog.vue';
  import { formatDate } from '@/utils';
  import { ElMessageBox, ElMessage } from 'element-plus';

  const formatDateStr = (data, isDue) => formatDate(data, isDue);
  const refreshTableTree = ref({});
  // 加载更多数据
  const loadChildHandler = async (row, treeNode, resolve) => {
    console.log(row.id, treeNode, '加载...', resolve);
    // 临时存储(expandCount避免循环加载)
    refreshTableTree.value[row.id] = { row, treeNode, resolve, expandCount: 0 };
    const {
      result: { data },
    } = await ResourcesService.getPageApi({ parentId: row.id, pageSize: 100 });
    resolve(data);
    return;
  };

  const resourcesDialogRef = ref(null);
  const addNewHandler = () => {
    resourcesDialogRef.value.openDialog();
  };
  // 初始化数据
  const tableData = ref([]);
  const pageTotal = ref(0);
  const expandRowKeys = ref([]);
  const initTableData = async (queryOption = {}) => {
    const {
      result: { data, total },
    } = await ResourcesService.getPageApi(queryOption);
    tableData.value = data;
    pageTotal.value = total;
    expandRowKeys.value = [];
  };
  // 更新数据的时候刷新
  const refreshTable = () => {
    initTableData();
  };
  const changePageHandler = (value) => {
    initTableData({ pageNumber: value });
  };
  // 展开行操作
  const expandChangeHandler = (rowData, isExpand) => {
    // 触发拉取数据
    const curr = refreshTableTree.value[rowData.id];
    curr.expandCount++;
    if (isExpand && curr.expandCount > 1) {
      loadChildHandler(rowData, curr.treeNode, curr.resolve);
    }
  };
  onMounted(() => {
    initTableData();
  });
  // 编辑行
  const modifyRowDataHandler = (rowData) => {
    resourcesDialogRef.value.openDialog(rowData);
  };
  // 修改状态
  const modifyRowStatusHandler = async (rowData) => {
    await ResourcesService.modifyStatusByIdApi(rowData.id);
    ElMessage.success('更新成功');
    initTableData();
  };
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '提示').then(async () => {
      await ResourcesService.deleteByIdApi(rowData.id);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
</script>

<style lang="scss" scoped></style>
