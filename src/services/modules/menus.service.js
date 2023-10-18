import BaseService from './../base.service';

export class MenusService extends BaseService {
  // 获取全部的菜单
  static async getAllMenusApi() {
    return BaseService.get('/admin/menus');
  }
}
