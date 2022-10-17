/**
 * 登录页面
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';

class ManpageUserList extends React.Component{

    constructor(props:{}) {
        super(props);
    }
    
    public componentWillMount() {
        // AppLoginServer.login();
    }
    public componentWillUnmount() {

    }
    
    render() {
    
        return (
            <div className="login-box">
                    角色列表
            </div>
        );
    }
}

export default ManpageUserList;