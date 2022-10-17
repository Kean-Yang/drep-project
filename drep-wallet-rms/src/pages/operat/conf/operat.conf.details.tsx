/**
 * 活动详情
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, message, Breadcrumb, PageHeader, Table, Descriptions, Modal ,Typography} from 'antd';
import './style/operat.conf.details.scss';
import { Link } from "react-router-dom";
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


class OperatConfDetails extends React.Component {
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
        return (
            <div className="page-OperatConfDetails">
                <Breadcrumb params=""><Breadcrumb.Item>经营活动</Breadcrumb.Item><Breadcrumb.Item>活动配置</Breadcrumb.Item><Breadcrumb.Item>活动详情</Breadcrumb.Item></Breadcrumb>
                <Title level={3} style={{ marginTop: 14 }}>活动详情</Title>

                <Descriptions title="" column={2}>
                    <Descriptions.Item label="活动名称">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="活动类型">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="活动描述">1111</Descriptions.Item>
                    <Descriptions.Item label="奖励类型">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="奖励数量">empty</Descriptions.Item>
                    <Descriptions.Item label="领取数量">1810000000</Descriptions.Item>
                </Descriptions>

                <div className="draw-list">
         
                    <Title level={4} >领取列表</Title>
                    <Button 

                        onClick={() => {
                            Modal.confirm({
                                title: "确认要批量导出领取列表吗？",
                                okText: "确定",
                                cancelText: "取消",
                                onOk: () => {
                                    message.success("导出成功");
                                }
                            });
                        }}

                    >批量导出<Icon type="download" /></Button>
                </div>


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
                    <Column title="用户ID" dataIndex="dataIndex" key="2" />
                    <Column title="用户昵称" dataIndex="dataIndex" key="3" />
                    <Column title="手机号" dataIndex="dataIndex" key="4" />
                    <Column title="领取数量" dataIndex="dataIndex" key="5" />
                    <Column title="币种" dataIndex="dataIndex" key="6" />
                    <Column title="参与时间" dataIndex="dataIndex" key="7" />
                    <Column title="领取时间" dataIndex="title" key="8" />

                </Table>
            </div>
        );
    }
}

export default OperatConfDetails;