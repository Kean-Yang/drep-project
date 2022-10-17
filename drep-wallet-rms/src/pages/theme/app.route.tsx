/**
 * 路由
 * @author 
 * @create 
 */

import * as React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { DrepRoute } from "./app.layout";
import './app.layout.scss';
import Login from "../login/app.login";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export class AppRoute extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div style={{ height: "100%" }}>
                    <Switch>
                        <Route
                            path="/"
                            render={() => {
                                return <Redirect to="/login" />;
                            }}
                            exact={true}
                        />
                        <Route path="/login" component={Login} />
                        <Route basename="/drep"
                            component={DrepRoute}
                        />
                    </Switch>
                </div>

            </Router>
        );
    }
}

export default AppRoute;