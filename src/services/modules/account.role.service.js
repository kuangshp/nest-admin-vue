import BaseService from './../base.service';

export class AccountRoleService extends BaseService {
  // 给账号分配角色
  static async distributionRoleApi(postData) {
    return BaseService.post('/admin/accountRole', postData);
  }

  // 根据账号获取选中的角色
  static async getAccountByRoleIdApi(accountId) {
    return BaseService.get(`/admin/accountRole/${accountId}`);
  }

  // 获取全部的角色
  static async getRoleListApi() {
    return BaseService.get('/admin/accountRole');
  }
}
