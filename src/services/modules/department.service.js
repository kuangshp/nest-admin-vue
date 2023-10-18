import BaseService from './../base.service';

export class DepartmentService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/department', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/department/delete', postData);
  }

  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/department/delete', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/department/${id}`);
  }

  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/department/batchStatus', postData);
  }

  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/department/${id}`, param);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/admin/department', queryOption);
  }

  static async getListApi(queryOption) {
    return BaseService.get('/admin/department/list', queryOption);
  }
}
