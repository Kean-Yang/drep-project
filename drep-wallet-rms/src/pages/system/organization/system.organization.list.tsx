/**
 * 组织列表
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';

class SystemOrganizationList extends React.Component{

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
                    组织列表
            </div>
        );
    }
}

export default SystemOrganizationList;