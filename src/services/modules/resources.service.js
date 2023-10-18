import BaseService from './../base.service';

export class ResourcesService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/resources', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/resources/delete', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/resources/delete', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/resources/${id}`);
  }

  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/resources/batchStatus', postData);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/resources/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/resources', queryOption);
  }

  // 获取模块
  static async getCatalogApi(queryOption) {
    return BaseService.get('/admin/resources/catalog', queryOption);
  }

  // 获取全部的菜单
  static async getAllMenusApi() {
    return BaseService.get('/admin/resources/menusList');
  }
}
