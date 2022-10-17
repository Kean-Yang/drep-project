/**
 * 用户列表详情
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Tabs, Form, Icon, Input, message, Breadcrumb, PageHeader, Table, Descriptions, List, Avatar, Row, Col, Rate } from 'antd';
import './style/system.role.details.scss';
import { Link } from "react-router-dom";

const { Column } = Table;
const { TabPane } = Tabs;



class SystemRoDetails extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false
        }
    }
    public componentWillMount() {
        // AppLoginServer.login();


    }
    public componentWillUnmount() {
        // console.log(this.props.match.params.id);
    }

    // state = {
    //     selectedRowKeys: [], // Check here to configure the default column
    //     loading: false,
    // };


    public callback = (key: any) => {
        console.log(key)
    };

    // 快速跳转到某一页。
    public onShowSizeChange = (current: any, pageSize: any) => {
        console.log(current)
        console.log(pageSize)
    }

    public onChange = (page: any) => {
        console.log(page)
    };

    render() {
        const routes = [
            {
                path: 'index',
                breadcrumbName: '系统配置',
            },
            {
                path: 'first',
                breadcrumbName: '角色列表',
            }
        ]

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
        ];
        return (
            <div className="page-SystemRoDetails">
                <Link to="/drep/role" style={{ fontSize: "18px", lineHeight: "48px" }}>
                    <PageHeader
                        onBack={() => ("")}
                        title="基本信息"
                        breadcrumb={{ routes }}
                        subTitle=""
                    />
                </Link>

                <div className="page-conent">
                    <Row >
                        <Col span={12}>
                            <Descriptions title="" column={1}>
                                <Descriptions.Item label="用户ID">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="用户昵称">1810000000</Descriptions.Item>
                                <Descriptions.Item label="用户类型">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="手机号">empty</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={6}>
                            <Descriptions title="" column={0}>
                                <Descriptions.Item label="UserName">
                                    <Avatar shape="square" size={140} icon="user" />
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Descriptions title="" column={2}>
                                <Descriptions.Item label="安全邮箱">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="邀请码">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="DREP等级"><Rate allowHalf defaultValue={2.5} count={5} disabled /></Descriptions.Item>
                                <Descriptions.Item label="用户状态">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="用户属性">empty</Descriptions.Item>
                                <Descriptions.Item label="联盟状态">1810000000</Descriptions.Item>
                                <Descriptions.Item label="总资产(CNY)">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="注册时间">empty</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>

                    <Tabs defaultActiveKey="1" onChange={this.callback} className="page-assets-tabs">
                        <TabPane tab="资产总览" key="1" className="page-assets-tabitem">
                            <Table
                                dataSource={columns}
                                pagination={{
                                    total: 500,
                                    current: 1,
                                    pageSize: 10,
                                    onChange: this.onChange,
                                    showQuickJumper: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ["10", "20", "30", "50"],
                                    showSizeChanger: true
                                }}
                            >
                                <Column title="总数量" dataIndex="dataIndex" key="1" />
                                <Column title="币种" dataIndex="title" key="2" />
                                <Column title="公链" dataIndex="dataIndex" key="3" />
                            </Table>
                        </TabPane>
                        <TabPane tab="资产流水" key="2" className="page-assets-tabitem">
                            <Table

                                dataSource={columns}
                                pagination={{
                                    total: 500,
                                    current: 1,
                                    pageSize: 20,
                                    onChange: this.onChange,
                                    showQuickJumper: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ["10", "20", "30", "40"],
                                    showSizeChanger: true
                                }}
                            >
                                <Column title="总数量" dataIndex="dataIndex" key="1" />
                                <Column title="币种" dataIndex="title" key="2" />
                                <Column title="公链" dataIndex="dataIndex" key="3" />
                            </Table>
                        </TabPane>
                        <TabPane tab="邀请列表" key="3" className="page-assets-tabitem">
                            <Table

                                dataSource={columns}
                                pagination={{
                                    total: 500,
                                    current: 1,
                                    pageSize: 20,
                                    onChange: this.onChange,
                                    showQuickJumper: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ["10", "20", "30", "40"],
                                    showSizeChanger: true
                                }}
                            >
                                <Column title="总数量" dataIndex="dataIndex" key="1" />
                                <Column title="币种" dataIndex="title" key="2" />
                                <Column title="公链" dataIndex="dataIndex" key="3" />
                            </Table>
                        </TabPane>
                        <TabPane tab="实名人证(二期)" key="4" className="page-assets-tabitem">
                            <Table

                                dataSource={columns}
                                pagination={{
                                    total: 500,
                                    current: 1,
                                    pageSize: 20,
                                    onChange: this.onChange,
                                    showQuickJumper: true,
                                    onShowSizeChange: this.onShowSizeChange,
                                    pageSizeOptions: ["10", "20", "30", "40"],
                                    showSizeChanger: true
                                }}
                            >
                                <Column title="总数量" dataIndex="dataIndex" key="1" />
                                <Column title="币种" dataIndex="title" key="2" />
                                <Column title="公链" dataIndex="dataIndex" key="3" />
                            </Table>
                        </TabPane>
                    </Tabs>
                </div>




            </div>
        );
    }
}

export default SystemRoDetails;