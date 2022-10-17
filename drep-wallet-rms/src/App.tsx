import React from 'react';
import { ConfigProvider } from "antd";
import './App.css';
import { AppRoute } from './pages/theme/app.route';
import zhCN from "antd/lib/locale-provider/zh_CN";

const App: React.FC = () => {
  return (
    <div className="App">
         <ConfigProvider locale={zhCN}>
          <AppRoute />
        </ConfigProvider>
    </div>
  );
}

export default App;
