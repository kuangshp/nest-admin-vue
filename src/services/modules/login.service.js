import BaseService from './../base.service';

export class LoginService extends BaseService {
  static async loginApi(postData) {
    return BaseService.post('/admin/login', postData);
  }
  // 获取图形验证码
  static async getCaptchaApi() {
    return BaseService.get('/admin/captcha');
  }
}
