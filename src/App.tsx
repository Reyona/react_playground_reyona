import React from 'react';
import './App.css';

import { Menu, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Demo from '@pages/demo';
import Employee from '@pages/employee'
import Settings from '@pages/settings'

const { Header, Content, Footer } = Layout;

function App() {
  const projectUrl = 'https://github.com/Reyona/react_playground_reyona'
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="app">
        <Header>
          <Menu mode="horizontal" theme="dark" defaultSelectedKeys={["demo"]} className="menu">
            <Menu.Item key="demo">Demo</Menu.Item>
            <Menu.Item key="employee">员工管理</Menu.Item>
            <Menu.Item key="setting">系统设置</Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Demo />
            <Employee />
            <Settings />
          </div>
        </Content>
        <Footer className="footer">
          项目地址：{' '}<a href={projectUrl}>{projectUrl}</a>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
