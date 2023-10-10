import BaseService from './../base.service';

export class AccountService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/account', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/account/delete', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/account/delete', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/account/${id}`);
  }

  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/account/batchStatus', postData);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/account/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/account', queryOption);
  }

  static async getListApi(queryOption) {
    return BaseService.get('/admin/account/list', queryOption);
  }
}
