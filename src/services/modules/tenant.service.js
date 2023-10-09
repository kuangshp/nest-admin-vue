import BaseService from './../base.service';

export class TenantService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/tenant', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/tenant/delete', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/tenant/delete', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/tenant/${id}`);
  }

  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/tenant/batchStatus', postData);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/tenant/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/tenant', queryOption);
  }
}
