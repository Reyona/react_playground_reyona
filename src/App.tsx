import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { Menu, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Demo from '@pages/demo';
import Employee from '@pages/employee'
import Settings from '@pages/settings'

const { Header, Content, Footer } = Layout;

function App({ match }: any) {
  const defaultKey = match.url.replace('/', '') || 'demo';
  const projectUrl = 'https://github.com/Reyona/react_playground_reyona'
  const menuList = [
    { label: 'Demo', key: 'demo', to: '/demo' },
    { label: '员工管理', key: 'employee', to: '/employee' },
    { label: '系统设置', key: 'settings', to: '/settings' },
  ]
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="app">
        <Header>
          <Menu mode="horizontal" theme="dark" defaultSelectedKeys={[ defaultKey ]} className="menu">
            {menuList.map(menuItem => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.to}>{menuItem.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Route path="/" exact component={ Demo } />
            <Route path="/demo" component={ Demo } />
            <Route path="/employee" component={ Employee } />
            <Route path="/settings" component={ Settings } />
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
