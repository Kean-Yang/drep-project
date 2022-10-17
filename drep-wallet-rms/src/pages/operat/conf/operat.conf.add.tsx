/**
 * 新增活动
 * @author 
 * @create 
 */

import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input, message, Breadcrumb, PageHeader, Table,Select } from 'antd';
import './style/operat.conf.list.scss';
import { Link } from "react-router-dom";
const { Column } = Table;
const { Option } = Select;

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

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };


    public handleSubmit = () => {
        // e.preventDefault();
        // this.props.form.validateFields(async (err, values) => {
        //     if (!err) {
        //         try {
        //             console.log(values)
        //         } catch (error) {
        //             message.error(JSON.stringify(error));
        //         }
        //     }
        // });
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
        // const { getFieldDecorator } = this.props.form;
        return (


            <div className="page">
                <PageHeader
                    title="活动列表"
                    breadcrumb={{ routes }}
                    subTitle=""
                />

                {/* <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="活动名称">
                        {getFieldDecorator(`username`, {
                            initialValue: this.state.username,
                            rules: [{ required: true, message: '用户名不能为空' }]
                        })(
                            <Input placeholder='username' />
                        )}
                    </Form.Item>
                    <Form.Item label="活动类型">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input type="password" placeholder='password' />
                        )}
                    </Form.Item>
                    <Form.Item label="活动描述">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input type="password" placeholder='password' />
                        )}
                    </Form.Item>
                    <Form.Item label="奖励类型">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Select
                            style={{ width: 300 }}
                            placeholder="奖励类型"
                            disabled={this.disabled}
                            onChange={this.onIsMiddlePageChange}
                        >
                            <Select.Option value="TRUE">是</Select.Option>
                            <Select.Option value="FALSE">否</Select.Option>
                        </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="奖励数量">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input type="password" placeholder='password' />
                        )}
                    </Form.Item>
                    <Form.Item label="开启时间">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input type="password" placeholder='password' />
                        )}
                    </Form.Item>
                    <Form.Item label="结束时间">
                        {getFieldDecorator(`password`, {
                            initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input type="password" placeholder='password' />
                        )}
                    </Form.Item>
                </Form> */}

                
            </div>
        );
    }
}

export default OperatConfList;