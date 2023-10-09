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
            <el-input v-model="formData.name" placeholder="请输入商户名称" clearable />
          </el-form-item>
          <el-form-item label="联系人" prop="username">
            <el-input v-model="formData.username" placeholder="请输入联系人" clearable />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item label="过期时间" prop="expireTime">
            <el-date-picker
              v-model="formData.expireTime"
              type="date"
              placeholder="请选择过期时间"
              clearable
              :disabled-date="disabledDate"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="省份" prop="provinceId">
            <el-select
              v-model="formData.provinceId"
              placeholder="请选择省份"
              style="width: 100%"
              clearable
              filterable
              @change="initCityHandler"
              @clear="clearProvinceHandler"
            >
              <el-option
                v-for="(item, index) of provinceList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市" prop="cityId">
            <el-select
              v-model="formData.cityId"
              placeholder="请选择市"
              style="width: 100%"
              clearable
              filterable
              @change="initAreaHandler"
              :disabled="!formData.provinceId"
              @clear="clearCityHandler"
            >
              <el-option
                v-for="(item, index) of cityList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="cityId">
            <el-select
              v-model="formData.areaId"
              placeholder="请选择地区"
              style="width: 100%"
              clearable
              filterable
              :disabled="!formData.provinceId || !formData.cityId"
            >
              <el-option
                v-for="(item, index) of areaList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入具体地址" />
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
  import { TenantService, AreaService } from '@/services';
  import { formatDate } from '@/utils';
  const dialogVisible = ref(false);
  const title = ref('创建商户');
  const formData = ref({
    name: null,
    username: null,
    mobile: null,
    sort: null,
    description: null,
    provinceId: null,
    cityId: null,
    areaId: null,
    expireTime: null,
    address: null,
  });
  const cancelHandler = () => {
    formData.value = {
      name: null,
      username: null,
      mobile: null,
      sort: null,
      description: null,
      provinceId: null,
      cityId: null,
      areaId: null,
      expireTime: null,
      address: null,
    };
    dialogVisible.value = false;
  };
  const newRowDate = ref(null);
  const openDialog = async (rowData = {}) => {
    await initProvince();
    if (!Object.keys(rowData).length) {
      newRowDate.value = null;
      title.value = '创建商户';
      formData.value = {
        name: null,
        username: null,
        mobile: null,
        sort: null,
        description: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        expireTime: null,
        address: null,
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
        provinceId: rowData.provinceId,
        cityId: rowData.cityId,
        areaId: rowData.areaId,
        expireTime: rowData.expireTime,
        address: rowData.address,
      };
      // TODO 编辑的时候要请求市和县
      await initCityHandler(rowData.provinceId);
      await initAreaHandler(rowData.cityId);
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
    expireTime: [
      {
        required: true,
        message: `过期时间必填`,
        trigger: ['change', 'blur'],
      },
    ],
  });
  const disabledDate = (time) => {
    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
  };
  const formRef = ref(null);
  const emit = defineEmits(['updateTable']);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          expireTime: formatDate(formData.value.formatDate, true),
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
  // 初始化全部的省份
  const provinceList = ref([]);
  const initProvince = async () => {
    const { result } = await AreaService.getAreaByPidApi();
    provinceList.value = result;
  };
  // 根据省份初始化市区
  const cityList = ref([]);
  const initCityHandler = async (pid) => {
    const { result } = await AreaService.getAreaByPidApi(pid);
    cityList.value = result;
  };
  // 根据市初始化地区
  const areaList = ref([]);
  const initAreaHandler = async (pid) => {
    const { result } = await AreaService.getAreaByPidApi(pid);
    areaList.value = result;
  };
  // 清空省
  const clearProvinceHandler = () => {
    formData.value.provinceId = null;
    formData.value.cityId = null;
    formData.value.areaId = null;
  };
  const clearCityHandler = () => {
    formData.value.cityId = null;
    formData.value.areaId = null;
  };
  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
