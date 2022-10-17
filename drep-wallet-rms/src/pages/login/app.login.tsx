import * as React from "react";
import "./style/app.login.scss"
import LoginForm from "./components/login.form";
export class Login extends React.Component {
    public render() {
        return (
            <div className="page-login">
                <div className="login-box">
                    <p className="title">钱包后台管理系统</p>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;