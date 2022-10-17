/**
 * 管理员列表
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';

class SystemAdminList extends React.Component{

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
                    管理员列表
            </div>
        );
    }
}

export default SystemAdminList;