import React from 'react';
import { Switch, Route } from 'react-router-dom';
// 系统配置
import SystemRoleList from './system/role/system.role.list';
import SystemRoDetails from './system/role/system.role.details';
import SystemOrganizationList from './system/organization/system.organization.list';
import SystemAdminList from './system/admin/system.admin.List';

// 用户管理
// import ManpageUserList from './manpage/user/user.list';
// import ManpageOorganizationList from './manpage/manpage.organization.list';
// import ManpageAdminList from './manpage/manpage.admin.List';

// 经营活动
import OperatConfList from './operat/conf/operat.conf.list';
import OperatConfDetails from './operat/conf/operat.conf.details';

import OperatEasyList from './operat/easy/operat.easy.list';
import OperatEasyDetails from './operat/easy/operat.easy.details';



// import SystemOrganizationList from './operat/operat.organization.list';
// import SystemAdminList from './operat/operat.admin.List';

// 财务中心
// import SystemRoleLiat from './finance/role/role.list';
// import SystemOrganizationList from './finance/system.organization.list';
// import SystemAdminList from './finance/system.admin.List';

export class PagesRouter extends React.Component {
    render() {
        return (
                <Switch>
                    {/* <Route exact path="/leo/order/detail/:id" component={OrderDetail} />
                    <Route exact path="/leo/commodity/min" component={Commoditymin} />
                    <Route exact path="/leo/commodity" component={CommodityPage} />
                    <Route exact path="/leo/order/query" component={OrderQueryFrom} />
                    <Route exact path="/leo/order" component={OrderList} /> */}
                    {/* <Route exact path="/leo/user" component={User} /> */}
                    <Route exact path="/drep/role" component={SystemRoleList} />
                    <Route exact path="/drep/role/details/:id" component={SystemRoDetails} />
                    <Route exact path="/drep/conf" component={OperatConfList} />
                    <Route exact path="/drep/conf/details/:id" component={OperatConfDetails} />
                    <Route exact path="/drep/esay" component={OperatEasyList} />
                    <Route exact path="/drep/esay/details/:id" component={OperatEasyDetails} />

                    <Route exact path="/drep/organization" component={SystemOrganizationList} />
                    <Route exact path="/drep/admin" component={SystemAdminList} />
                </Switch>
         
        );
    }
}

