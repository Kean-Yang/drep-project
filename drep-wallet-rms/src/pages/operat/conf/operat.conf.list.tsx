/**
 * 活动列表
 * @author 
 * @create 
 */

import * as React from 'react';
import Conflistlistquery from "./components/operat.conflist.query";
import { Button, Checkbox, Form, Icon, Input, message, Breadcrumb, PageHeader, Table, Modal, Typography } from 'antd';
import { Link } from "react-router-dom";
import AddOperatConfFrom from "./components/add.form"

import './style/operat.conf.list.scss';
const { Title } = Typography;
const { Column } = Table;

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


class OperatConfList extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        }
    }
    public componentWillMount() {
        // AppLoginServer.login();
    }
    public componentWillUnmount() {

    }
    public onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
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
                path: '',
                breadcrumbName: '经营活动',
            },
            {
                path: '',
                breadcrumbName: '活动配置',
            }
        ];

        return (
            <div className="page-OperatConfList">
                <Breadcrumb params=""><Breadcrumb.Item>经营活动</Breadcrumb.Item><Breadcrumb.Item>活动配置</Breadcrumb.Item></Breadcrumb>
                <PageHeader title="活动列表" />
                {/* <RoleListQuery></RoleListQuery> */}

                <Conflistlistquery />


                <div className="page-conent">

                    <Button style={{ marginBottom: 24 }}
                        onClick={() => {
                            Modal.confirm({
                                title: "确认解冻该用户吗？",
                                okText: "确定",
                                cancelText: "取消",
                                onOk: () => {
                                    message.success("冻结成功");
                                }
                            });

                        }}

                    >新增活动</Button>
                    <Title level={4} >领取列表</Title>
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
                        <Column title="活动名称" dataIndex="dataIndex" key="1" />
                        <Column title="奖励类型" dataIndex="title" key="2"
                        // render={(status) => {
                        //     switch (status) {
                        //         case "WAIT_PAY":
                        //             return (<span>待扣款</span>);
                        //             break;
                        //         case "ORDER_CLOSED":
                        //             return (<span>订单关闭</span>);
                        //             break;
                        //         case "INSURE_SUCCESS":
                        //             return (<span>投保完成</span>);
                        //             break;
                        //         case "SURRENDER":
                        //             return (<span>已退保</span>);
                        //             break;
                        //         default:
                        //             return "--";
                        //             break;
                        //     }
                        // }}
                        />
                        <Column title="奖励数量" dataIndex="dataIndex" key="3" />
                        <Column title="活动类型" dataIndex="title" key="4"
                        // render={(status) => {
                        //     switch (status) {
                        //         case "WAIT_PAY":
                        //             return (<span>待扣款</span>);
                        //             break;
                        //         case "ORDER_CLOSED":
                        //             return (<span>订单关闭</span>);
                        //             break;
                        //         case "INSURE_SUCCESS":
                        //             return (<span>投保完成</span>);
                        //             break;
                        //         case "SURRENDER":
                        //             return (<span>已退保</span>);
                        //             break;
                        //         default:
                        //             return "--";
                        //             break;
                        //     }
                        // }}
                        />
                        <Column title="活动状态" dataIndex="title" key="4"
                        // render={(status) => {
                        //     switch (status) {
                        //         case "WAIT_PAY":
                        //             return (<span>待扣款</span>);
                        //             break;
                        //         case "ORDER_CLOSED":
                        //             return (<span>订单关闭</span>);
                        //             break;
                        //         case "INSURE_SUCCESS":
                        //             return (<span>投保完成</span>);
                        //             break;
                        //         case "SURRENDER":
                        //             return (<span>已退保</span>);
                        //             break;
                        //         default:
                        //             return "--";
                        //             break;
                        //     }
                        // }}
                        />
                        <Column title="开始时间" dataIndex="dataIndex" key="5" />
                        <Column title="结束时间" dataIndex="title" key="6" />
                        <Column title="操作" dataIndex="title" key="9"
                            render={(text: any, record: any) => {
                                return (
                                    <div>
                                        <Link style={{ cursor: "pointer", color: "#1890ff", borderBottom: "1px solid" }} to={`/drep/role/details/${"1"}`}>查看</Link>
                                        {record.status === "DISABLE" ? (
                                            <Button type="primary" size="small" style={{ marginLeft: 16 }}
                                                onClick={() => {
                                                    Modal.confirm({
                                                        title: "确认终止该用户吗？",
                                                        okText: "确定",
                                                        cancelText: "取消",
                                                        onOk: () => {
                                                            message.success("终止成功");
                                                        }
                                                    });
                                                }}
                                            >
                                                终止
                                            </Button>
                                        ) : (
                                                <Button type="primary" size="small" style={{ marginLeft: 16 }}
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            title: "确认恢复该用户吗？",
                                                            okText: "确定",
                                                            cancelText: "取消",
                                                            onOk: () => {
                                                                message.success("恢复成功");
                                                            }
                                                        });
                                                    }}
                                                >
                                                    恢复
                                                </Button>
                                            )}
                                    </div>
                                );
                            }}
                        />
                    </Table>

                </div>

            </div>
        );
    }
}

export default OperatConfList;