import BaseService from './../base.service';

export class AreaService extends BaseService {
  static async getAreaByPidApi(pid = 0) {
    return BaseService.get(`/admin/area/${pid}`);
  }
}
