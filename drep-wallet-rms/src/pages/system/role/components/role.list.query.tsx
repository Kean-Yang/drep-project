import * as React from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";

import FormItem from "antd/lib/form/FormItem";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
// import { loginService } from '../app.login.service'
// import "../style/app.login.scss"
const Option = Select.Option;
@observer
export class MyForm extends React.Component<any> {
    public render() {
        return (
            <Row gutter={16} style={{padding:"0 24px"}}>
                <Col span={4}>
                    <Form.Item >
                        {this.props.form.getFieldDecorator("id", {
                            rules: [
                                {
                                    message: "只能为正整数",
                                    pattern: /^\+?[1-9][0-9]*$/
                                }
                            ]
                        })(<Input placeholder="手机，邮箱" allowClear />)}
                    </Form.Item>
                </Col>

                <Col span={4} >
                    <Form.Item >
                        {this.props.form.getFieldDecorator("angb")(<Input placeholder="资产范围" allowClear />)}
                    </Form.Item>

                </Col>

                <Col span={4}>
                    <Form.Item >
                        {this.props.form.getFieldDecorator("ankb")(<Input placeholder="资产范围" allowClear />)}
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item >
                        {this.props.form.getFieldDecorator("status")(
                            <Select placeholder="请选择联盟状态" allowClear style={{ width: "100%" }}>
                                <Option key={0} value="1">
                                    未联盟
                                </Option>
                                <Option key={1} value="2">
                                    已联盟
                                </Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={4} offset={2} style={{ lineHeight: "40px"}}>
                    <Button type="primary">查询</Button>
                    <Button type="primary" style={{ marginLeft: 16 }}>重置</Button>
                </Col>
            </Row>
        );
    }
}

const Rolelistquery = Form.create()(MyForm);
export default Rolelistquery;