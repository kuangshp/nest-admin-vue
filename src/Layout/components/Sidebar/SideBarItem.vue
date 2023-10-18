<template>
  <!-- 有子路由的时候 -->
  <el-sub-menu
    v-if="route.children?.length"
    :index="route.url ? route.url : ''"
    :style="{ width: !props.sidebarOpened ? '210px' : '64px' }"
  >
    <template #title>
      <el-icon>
        <SvgIcon v-if="route?.icon" :icon="route.icon"> </SvgIcon>
        <SvgIcon v-else icon="personnel"> </SvgIcon>
      </el-icon>
      <span class="submenu-title">{{ route.title }}</span>
    </template>
    <!-- 递归循环 -->
    <SideBarItem
      v-for="(item, index) in route.children"
      :key="index"
      :route="item"
      :basePath="item.url"
    ></SideBarItem>
  </el-sub-menu>
  <!-- 没有子路由的时候 -->
  <template v-else>
    <el-menu-item
      :index="route.url ? route.url : ''"
      :style="{
        width: !props.sidebarOpened ? '210px' : '64px',
        display: 'block',
        background: '#304156',
      }"
    >
      <el-icon>
        <SvgIcon v-if="route.icon" :icon="route.icon"></SvgIcon>
        <SvgIcon v-else icon="personnel-manage"> </SvgIcon>
      </el-icon>
      <template #title>
        <span>{{ route.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
  import { isExternal } from '@/utils';
  import { ElMessage } from 'element-plus';
  // 后端已经授权的菜单
  const props = defineProps({
    route: {
      type: Object,
      default: () => {},
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
    // 修改宽度传递当前是否展开或者折叠
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  });
  // 点击跳转外部链接(可能是单点登录进入到另外一个系统)
  const clickLinkHandler = (route) => {
    if (!route.path) {
      console.log(route.meta.linkUrl, '点击');
      if (isExternal(route.meta.linkUrl)) {
        window.open(route.meta.linkUrl, '_blank');
      } else {
        ElMessage.warning(`${route.meta.linkUrl}不是合法的url地址`);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
