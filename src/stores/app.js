import { defineStore } from 'pinia';
import { MenusService } from '@/services';
import router from '@/router';
import { getTreeList } from '@/utils';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebarOpened: true,
      globalToken: null,
      globalRefreshToken: null,
      globalUserInfo: null,
      size: 'default',
      language: 'zh-CN',
      // TODO 实际开发替换模拟后端返回的菜单列表
      authMenusList: [],
      menusTreeList: [],
      authBtnList: [], // 按钮权限列表
    };
  },
  getters: {},
  actions: {
    toggleSidebar() {
      this.sidebarOpened = !this.sidebarOpened;
    },
    // 设置token
    setGlobalToken(token) {
      this.globalToken = token;
    },
    // 刷新token
    setGlobalRefreshToken(token) {
      this.globalRefreshToken = token;
    },
    // 模拟获取菜单接口
    async getMenusApi() {
      const { result } = await MenusService.getAllMenusApi();
      console.log(result, '全部的菜单');
      this.authMenusList = result;
      this.menusTreeList = getTreeList(result, 'id', 'parentId');
    },
    // 根据当前路由获取接口权限
    async getBtnApi(url) {
      console.log('getBtnApi', url);
      const { result } = await MenusService.getAllBtnByMenusUrlApi(url);
      this.authBtnList = result;
    },
    clearGlobalToken() {
      this.globalToken = null;
      this.globalRefreshToken = null;
      this.authMenusList = [];
      this.menusTreeList = [];
      this.authBtnList = [];
    },
    setGlobalUserInfo(userInfo) {
      this.globalUserInfo = userInfo;
    },
    logout() {
      // 登出操作
      this.clearGlobalToken();
      window.localStorage.clear();
      router.push('/login');
    },
  },
  // 数据持久化
  persist: true,
});
