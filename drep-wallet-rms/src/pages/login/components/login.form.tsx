import * as React from "react";
import { Button, Form, Input, message, Icon, Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { loginService } from '../app.login.service'
import "../style/app.login.scss"

@observer
export class MyForm extends React.Component<any> {
    @observable public account: string = "";
    @observable public password: string = "";
    @observable public showError: boolean = false
    @observable public remember: boolean = false
    @observable public validate: string = "";
    @observable public expression: string = "";
    @observable public validateInput: string = "";
    @observable public usernameFocus: boolean = false
    @observable public passwordFocus: boolean = false
    @action public accountChange(event: any) {
        this.showError = false
        this.account = event.target.value
    }

    @action public passwordChange(event: any) {
        this.showError = false
        this.password = event.target.value
    }
    @action public handleChange(event: any) {
        console.log(event.target.value)
        this.validateInput = event.target.value;
    }

    public componentDidMount = () => {
        this.renderCode();
    }

    public handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.checkAccount(values.username, values.password)
            } else {
                message.error("用户名或者密码不能为空!")
            }
        });
    }

    private checkAccount(username: string, password: string) {
        loginService.login({ username, password }).then((res: any) => {
            console.log(res);
            // 用户名  密码 drep 666
            this.props.history.push('./drep/role')
            // if (res.data.hasOwnProperty("accessToken")) {
            //     // localStorage.setItem("auth", window.btoa(username + ":" + res.data.accessToken));
            //     // localStorage.setItem("nickName", res.data.nickName);

            // } else {
            //     this.showError = true
            //     message.error("用户名或密码错误!")
            // }
        })
    }
    
    // 生成验证码

    public renderCode = () => {
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        var expression = '', result;
        result = '';
        var codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
        for (var i = 0; i < 4; i++) {
            result = result + codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
        }
        //随机获取字母四个

        expression = result.toLowerCase();//忽略大小写
        console.log(expression, result)
        this.expression = expression;
        this.validate = result;
    }




    public render() {
        return (
            <div className="login-form">
                <Form onSubmit={(this.handleSubmit)}>
                    <FormItem className={(this.showError ? "has-error" : "") + (this.passwordFocus ? " small-size" : "")}>
                        {this.props.form.getFieldDecorator("username", {
                            value: this.account,
                            rules: [{
                                required: true,
                                message: "请输入账号"
                            }]
                        })(
                            <Input
                                onFocus={() => {
                                    this.usernameFocus = true
                                }}
                                onBlur={() => {
                                    this.usernameFocus = false
                                }}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入账号"
                                onChange={(event: any) => this.accountChange(event)}
                            />
                        )}
                    </FormItem>

                    <FormItem className={(this.showError ? "has-error" : "") + (this.passwordFocus ? " small-size" : "")} >
                        {this.props.form.getFieldDecorator("password", {
                            value: this.account,
                            rules: [{
                                required: true,
                                message: "请输入密码"
                            }]
                        })(
                            <Input
                                onFocus={() => {
                                    this.passwordFocus = true
                                }}
                                onBlur={() => {
                                    this.passwordFocus = false
                                }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                onChange={(event: any) => this.passwordChange(event)}
                            />
                        )}
                    </FormItem>

                    <FormItem className={(this.showError ? "has-error" : "") + (this.passwordFocus ? " small-size" : "")} >
                        {this.props.form.getFieldDecorator("validateInput", {
                            value: this.account,
                            rules: [{
                                required: true,
                                message: "请输入验证码"
                            }]
                        })(
                            <div className="login-captcha">
                                <Input
                                    onFocus={() => {
                                        this.passwordFocus = true
                                    }}
                                    onBlur={() => {
                                        this.passwordFocus = false
                                    }}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    placeholder="请输入验证码"
                                    onChange={(event: any) => this.handleChange(event)}
                                />
                                <Button
                                    className="am-btn"
                                    onClick={this.renderCode}>
                                    {this.expression}</Button>
                            </div>
                        )}
                    </FormItem>
                    <FormItem className="login-but">
                        {this.props.form.getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox style={{ float: "left" }} >记住密码</Checkbox>)}

                        <Button type="primary" htmlType="submit" className="login-form-button"
                            disabled={!this.account || !this.password ||
                                this.account === "" || this.password === ""}
                            style={{ float: "right", width: "120px" }}

                        >
                            登录
                        </Button>

                    </FormItem>

                </Form>
            </div>
        );
    }
}
const LoginForm = Form.create()(MyForm);
export default LoginForm;