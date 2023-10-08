import BaseService from './../base.service';

export class TenantService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/tenant', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/tenant/${id}`);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/tenant/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/tenant', queryOption);
  }
}
