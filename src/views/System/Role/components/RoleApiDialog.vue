<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="50%"
      append-to-body
    >
      <div class="dialog-content role-api">
        <el-form :model="roleForm" label-width="100">
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属集团">
            <el-input v-model="roleForm.tenantName" disabled></el-input>
          </el-form-item>
          <!-- 展示全部的菜单树 -->
          <el-form-item label="数据权限">
            <el-tree
              ref="treeRef"
              :data="resourceData"
              show-checkbox
              node-key="id"
              :props="{ class: customNodeClass }"
              @check="handleCheckChange"
            />
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
  import { RoleResourcesService, ResourcesService } from '@/services';
  import { getTreeList } from '@/utils';
  const dialogVisible = ref(false);
  const title = ref('数据权限');
  const loading = ref(false);
  const roleForm = ref({});
  const emits = defineEmits(['updateTable']);
  const openDialog = async (rowData = {}) => {
    // TODO 这个必须放到最前面不然选中不能实现
    dialogVisible.value = true;
    initCheckedNodeKey.value = [];
    await initAllResourcesList();
    await initRoleResourceList(rowData.id);
    roleForm.value = rowData;
    setCheckedKeys(initCheckedNodeKey.value);
  };

  const cancelHandler = () => {
    dialogVisible.value = false;
  };
  const confirmHandler = async () => {
    console.log(allCheckedNodes.value, '选择的权限');
    await RoleResourcesService.dispatchResourcesApi({
      roleId: roleForm.value.id,
      resourceList: allCheckedNodes.value,
      type: 1, // 数据权限
    });
    cancelHandler();
    emits('updateTable');
  };

  // 树结构字段名
  const defaultProps = {
    children: 'children',
    label: 'title',
  };
  // 全部的资源
  const resourceData = ref([]);
  // 获取选择的key
  const treeRef = ref(null);
  // 最后选中的
  const allCheckedNodes = ref([]);
  // 当前选中的
  const initCheckedNodeKey = ref([]);
  // 选择节点
  const handleCheckChange = (data, checked, indeterminate) => {
    console.log(data, checked, indeterminate);
    const checkedNodes = treeRef.value.getCheckedNodes(false, true);
    console.log(
      checkedNodes.map((item) => item.id),
      '全部的'
    );
    allCheckedNodes.value = checkedNodes.map((item) => item.id);
  };
  // 处理树半选
  const findTreeCheckedNodeKey = (checkedNodeList, treeData) => {
    console.log(checkedNodeList, '选中的', treeData);
    let isExit = false;
    for (let item of treeData) {
      if (item?.children?.length > 0) {
        // 如果有children，那么说明它是父级
        isExit = false;
        findTreeCheckedNodeKey(checkedNodeList, item.children);
      } else {
        // 当它是子级时再进行匹配
        for (let it of checkedNodeList) {
          if (item.id == it) {
            // 菜单权限匹配
            initCheckedNodeKey.value.push(item.id);
          } else {
            // 且没有匹配成功
            isExit = true;
          }
        }
      }
    }
    if (isExit) {
      // 循环完成后进行判断
      return false;
    }
  };

  const setCheckedKeys = (defaultChecked = []) => {
    console.log(defaultChecked, '默认选中');
    treeRef.value && treeRef.value.setCheckedKeys(defaultChecked);
  };
  // 获取全部的资源
  const initAllResourcesList = async () => {
    const { result } = await ResourcesService.getAllResourcesApi(1);
    const list = result.map((item) => {
      return {
        ...item,
        id: item.id,
        label: item.title,
        // isPenultimate: true,
      };
    });
    const treeData = getTreeList(list, 'id', 'parentId');
    console.log(treeData, '?');
    resourceData.value = treeData;
  };
  // 根据角色id获取已经授权的资源
  const initRoleResourceList = async (roleId) => {
    const { result } = await RoleResourcesService.getResourcesByRoleIdApi(roleId, 1);
    findTreeCheckedNodeKey(
      result.map((item) => item.id),
      resourceData.value
    );
  };

  const customNodeClass = (data, node) => {
    if (data.isPenultimate) {
      return 'is-penultimate';
    }
    return null;
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss">
  .role-api {
    .el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
      display: flex;
      flex-direction: row;
    }
  }
</style>
