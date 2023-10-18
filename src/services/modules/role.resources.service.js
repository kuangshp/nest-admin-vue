import BaseService from './../base.service';

export class RoleResourcesService extends BaseService {
  // 给角色分配资源
  static async dispatchResourcesApi(postData) {
    return BaseService.post('/admin/roleResources', postData);
  }

  // 根据角色id获取已经分配的资源
  static async getResourcesByRoleIdApi(roleId) {
    return BaseService.get(`/admin/roleResources/${roleId}`);
  }
}
