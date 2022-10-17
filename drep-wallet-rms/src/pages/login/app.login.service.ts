/**
 * 登录 Service
 * @author 
 * @create 
 */

import { AxiosReq } from "../../utils/AxiosReq";

export class LoginService {
    public login(data: { username: string, password: string }) {
        return AxiosReq.post('/login', {
            username: data.username,
            password: data.password
        })
    }

}

export const loginService = new LoginService();