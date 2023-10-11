import BaseService from './../base.service';

export class RoleService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/role', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/role/delete', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/role/delete', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/role/${id}`);
  }

  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/role/batchStatus', postData);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/role/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/role', queryOption);
  }

  static async getListApi(queryOption) {
    return BaseService.get('/admin/role/list', queryOption);
  }
}
