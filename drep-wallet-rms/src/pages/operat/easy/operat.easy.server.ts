/**
 * 活动列表
 * @author 
 * @create 
 */

import { AxiosReq } from "../../../utils/AxiosReq";
import { ILoginParam } from "./operat.easy.interface";

export default {
    // 登陆
    login(params: ILoginParam) {
        return AxiosReq.post(`/faucet`, {"key":"DREP_Exp666","address":"sdas"}).then(res => {
            return res.data;
        });
    }
    
    // 发送验证码
    // public closePageById(id: string) {
    //     return adRequestHelper.post(`page/flow/close/${id}`).then(res => {
    //         return res.data;
    //     });
    // }
}

// export const appLoginServer = new AppLoginServer();
