import BaseService from './../base.service';

export class MenusService extends BaseService {
  // 获取全部的菜单
  static async getAllMenusApi() {
    return BaseService.get('/admin/menus');
  }

  // 根据当前菜单获取当前按钮权限
  static async getAllBtnByMenusUrlApi(urlName) {
    return BaseService.get(`/admin/menus/btnList?urlName=${urlName}`);
  }
}
