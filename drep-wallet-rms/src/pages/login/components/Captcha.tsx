
import * as React from 'react';
import { Input, Button } from 'antd';

// var Captcha = React.createClass({
//     propTypes: {
//         bgImage: React.PropTypes.string,
//         size: React.PropTypes.number,
//         captchaType: React.PropTypes.oneOf(['Calculation', 'Normal']),
//         color: React.PropTypes.string
// }

class Captcha extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            expression: '',
            validate: '',
            validateInput: ''
        }
    }
    
    readonly state: any = {
        expression: '',
        validate: '',
        validateInput: ''
    }

    public componentDidMount = () => {
        this.renderCode();
    }


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
        this.setState({
            //设置更新状态
            expression: expression,
            validate: result
        });
    }



    public handleChange = (e: any) => {

        console.log(e.target.value)
        console.log(this.state.validateInput)

    }


    render() {
        // var inlineStyle = {
        //     color: this.props.color,
        //     backgroundImage: 'url(' + this.props.bgImage + ')'
        // };

        return (
            <div>
                <Input
                    value={this.state.validateInput}
                    placeholder="请输入验证码"
                    allowClear
                    onChange={this.handleChange} />

                <Button
                    className="am-btn"
                    onClick={this.renderCode}>
                    {this.state.expression}</Button>
            </div>
        );
    }
}

export default Captcha;