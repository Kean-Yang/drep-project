/**
 * 活动列表
 * @author 
 * @create 
 */

import * as React from 'react';
import EasyFlistQuery from "./components/operat.easyflist.query";
import { Button, Checkbox, Form, Icon, Input, message, Breadcrumb, PageHeader, Table, Modal ,Typography} from 'antd';
import './style/operat.easy.list.scss';
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


class OperatEasyList extends React.Component {
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
        return (
            <div className="page-OperatEasyList">
                <Breadcrumb params=""><Breadcrumb.Item>经营活动</Breadcrumb.Item><Breadcrumb.Item>领取列表</Breadcrumb.Item></Breadcrumb>
                <PageHeader title="领取列表" />
                <EasyFlistQuery></EasyFlistQuery>

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
                    >批量导出<Icon type="download" /></Button>
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
                        <Column title="用户ID" dataIndex="title" key="2"/>
                        <Column title="用户昵称" dataIndex="dataIndex" key="3" />
                        <Column title="手机号" dataIndex="dataIndex" key="4" />
                        <Column title="安全邮箱" dataIndex="dataIndex" key="5" />
                        <Column title="领取数量" dataIndex="dataIndex" key="6" />
                        <Column title="名称" dataIndex="dataIndex" key="7" />
                        <Column title="参与时间" dataIndex="dataIndex" key="8" />
                        <Column title="领取时间" dataIndex="dataIndex" key="9" />
                    </Table>
                </div>
            </div>
        );
    }
}

export default OperatEasyList;