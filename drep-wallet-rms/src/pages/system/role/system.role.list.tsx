import * as React from 'react';
import Rolelistquery from "./components/role.list.query";
import { Button, Checkbox, Form, Icon, Input, message, Breadcrumb, PageHeader, Table, Typography, Modal } from 'antd';
import { observer } from "mobx-react";
import { WrappedFormUtils, FormComponentProps } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import './style/system.role.list.scss';


const { Column } = Table;
const { Title } = Typography;
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

const data: any = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

@observer
class SystemRoleList extends React.Component<FormComponentProps> {
    // constructor(props: {}) {
    //     super(props);
    //     this.state = {
    //         selectedRowKeys: [], // Check here to configure the default column
    //         loading: false,
    //     }
    // }
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

    public freeze = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    public export = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }




    // 快速跳转到某一页。
    public onShowSizeChange = (current: any, pageSize: any) => {
        console.log(current)
        console.log(pageSize)
    }

    public onChange = (page: any) => {
        console.log(page)
    };


    render() {

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="page-SystemRoleList">
               <Breadcrumb params=""><Breadcrumb.Item>系统配置</Breadcrumb.Item><Breadcrumb.Item>角色列表</Breadcrumb.Item></Breadcrumb>
                <PageHeader title="角色列表" />
                <Rolelistquery />


                <div className="page-conent">

                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.freeze} disabled={!hasSelected} loading={loading}>冻结</Button>
                        {/* <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span> */}
                        <Button type="primary" onClick={this.export} disabled={!hasSelected} loading={loading} style={{ marginLeft: 16 }}>导出</Button>
                    </div>


                    <Table
                        rowSelection={rowSelection}
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
                        <Column title="用户ID" dataIndex="dataIndex" key="1" />
                        <Column title="总资产(CNY)" dataIndex="title" key="2" />
                        <Column title="用户类型" dataIndex="dataIndex" key="3" />
                        <Column title="手机号" dataIndex="title" key="4" />
                        <Column title="安全邮箱" dataIndex="dataIndex" key="5" />
                        <Column title="联盟状态" dataIndex="title" key="6"
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
                        <Column title="用户状态" dataIndex="title" key="7"
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
                        <Column title="注册时间" dataIndex="title" key="8" />
                        <Column title="操作" dataIndex="title" key="9"
                            render={(text: any, record: any) => {
                                return (
                                    <div>
                                        <Link style={{ cursor: "pointer", color: "#1890ff", borderBottom: "1px solid" }} to={`/drep/role/details/${"1"}`}>查看</Link>
                                        {record.status === "DISABLE" ? (
                                            <Button type="primary" size="small" style={{ marginLeft: 16 }}
                                                onClick={() => {
                                                    Modal.confirm({
                                                        title: "确认冻结该用户吗？",
                                                        okText: "确定",
                                                        cancelText: "取消",
                                                        onOk: () => {
                                                            message.success("冻结成功");
                                                        }
                                                    });
                                                }}
                                            >
                                                冻结
                                            </Button>
                                        ) : (
                                                <Button type="primary" size="small" style={{ marginLeft: 16 }}
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
                                                >
                                                    解冻
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

export default SystemRoleList;