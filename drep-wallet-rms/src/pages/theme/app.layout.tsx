/**
 * 路由
 * @author 
 * @create 
 */

import * as React from "react";
import { Layout, Menu, Icon, Avatar, Popover, Modal } from 'antd';
import { PagesRouter } from "../app.pages.route"
import { Link ,withRouter} from 'react-router-dom';
const AppMenu = require("./app.menu")

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export class DrepRoute extends React.Component {
    constructor(props:{}) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    componentWillMount() {
        
    }
    // toggle = () => {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // }

    // onCollapse = collapsed => {

    //     this.setState({ collapsed });
    // };
    render() {
        const content = (
            <div style={{ cursor: "pointer" }}
                onClick={() => {
                    const that = this;
                    Modal.confirm({
                        title: "确认退出",
                        content: "您确认要退出当前账号吗？",
                        okText: "确认",
                        cancelText: "取消",
                        onOk() {
                            // localStorage.removeItem('auth', 'nickName');
                            // this.props.history.push("/login");
                            
                        },
                        onCancel() {
                            return false
                        },
                    })
                }}>
                <Icon type="minus-circle" theme="twoTone" />
                <span>退出登录</span>
            </div>
        );

        return (
            <Layout
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    width: '100%'
                }}
            >
                <Sider
                    trigger={null}
                    collapsible
                    // collapsed={this.state.collapsed}
                    // onCollapse={this.onCollapse}
                    breakpoint="md"
                >
                    <Menu theme="dark" mode="inline">
                        {AppMenu.AppMenu && AppMenu.AppMenu.map((v:any, key:any) => {
                            return (
                                <SubMenu
                                    key={v.key}
                                    title={
                                        <span>
                                            <Icon type={v.icon} />
                                            <span>{v.name}</span>
                                        </span>
                                    }
                                >
                                    {v.children && v.children.map((i:any, key:any) => {
                                        return (
                                            <Menu.Item key={i.key} >
                                                {i.name}
                                                {/* <Link to={i.url} style={{ border: "none", outline: "none" }} >{i.name}</Link> */}

                                                <Link to={i.url} style={{ border: "none", outline: "none" }} >{i.name}</Link> 
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        })}
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#FFF', padding: 0, cursor: "pointer" }}>
                        <span style={{ float: 'left', fontSize: '1.4em', margin: "2px 20px" }}>
                            <Icon
                                className="trigger"
                                // type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                // onClick={this.toggle}
                                style={{ cursor: 'pointer' }}
                            />
                        </span>

                        <Popover placement="bottomLeft" title={""} content={content} trigger="hover">
                            <Avatar style={{ float: 'right', fontSize: '1.4em', margin: "20px 78px 20px 34px", cursor: "pointer" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Popover>
                    </Header>
                    
                    <Content style={{ margin: '24px 16px', minWidth: "720px" }}>
                        <div style={{ background: '#fff', minHeight: 780, marginBottom: "40px" }}>
                            <Layout.Content style={{ padding: "24px", width: "100%", height: "100%" }}>
                                <PagesRouter />
                            </Layout.Content>
                        </div>
                    </Content>

                </Layout>

            </Layout>
        );
    }
}

export default DrepRoute;