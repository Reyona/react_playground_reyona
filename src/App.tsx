import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { Menu, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Demo from '@pages/demo';
import Employee from '@pages/employee'
import Settings from '@pages/settings'
import ThemedPage from '@/pages/theme'
import HocPage from '@/pages/hoc'
import ColorPage from '@/pages/color'
import CatPage from '@/pages/cat'
import DragPage from '@/pages/drag/index'
import DragIframe from '@/pages/drag/iframe'
import SetStatePage from '@/pages/setState/index'
import EventPage from '@/pages/event/index'

const { Header, Content, Footer } = Layout;

function App({ match, location }: any) {
  const defaultKey = match.url.replace('/', '') || 'demo';
  const projectUrl = 'https://github.com/Reyona/react_playground_reyona'
  const menuList = [
    { label: 'Demo', key: 'demo', to: '/demo' },
    { label: '高阶组件', key: 'hoc', to: '/hoc' },
    { label: '员工管理', key: 'employee', to: '/employee' },
    { label: '系统设置', key: 'settings', to: '/settings' },
    { label: '主题切换', key: 'themes', to: '/themes' },
    { label: 'Color', key: 'color', to: '/color' },
    { label: 'Cat', key: 'cat', to: '/cat' },
    { label: '跨iframe拖拽', key: 'drag', to: '/drag' },
    { label: 'setState测试', key: 'state', to: '/state' },
    { label: '合成事件冒泡测试', key: 'event', to: '/event' },
  ]
  let hideLayout = ['/drag', '/drag-iframe'].includes(location.pathname)

  // start 合成事件冒泡测试
  const handleClick = (e: any) => {
    // console.log('App合成:点击了===', e);
  };
  // setTimeout(() => {
  //   document.getElementById('app-clickable')?.addEventListener('click', e => {
  //     console.log('App原生:点击了===', e);
  //   });
  // }, 1000);
  // end 合成事件冒泡测试

  return (
    <div id="app-clickable" onClick={ handleClick }>
      <ConfigProvider locale={zhCN}>
        { hideLayout ? (<>
          {/* 拖拽demo不要展示其他组件 */}
          <Route path="/drag" component={ DragPage } />
          <Route path="/drag-iframe" component={ DragIframe } />
        </>) : (<>
          <Layout className="app">
            <Header>
              <Menu mode="horizontal" theme="dark" defaultSelectedKeys={[ defaultKey ]} className="menu">
                { menuList.map(menuItem => (
                  <Menu.Item key={ menuItem.key }>
                    <Link to={ menuItem.to }>{ menuItem.label }</Link>
                  </Menu.Item>
                )) }
              </Menu>
            </Header>
            <Content className="contentWrap">
              <div className="content">
                <Route path="/" exact component={ Demo } />
                <Route path="/demo" component={ Demo } />
                <Route path="/hoc" component={ HocPage } />
                <Route path="/employee" component={ Employee } />
                <Route path="/settings" component={ Settings } />
                <Route path="/themes" component={ ThemedPage } />
                <Route path="/color" component={ ColorPage } />
                <Route path="/cat" component={ CatPage } />
                <Route path="/state" component={ SetStatePage } />
                <Route path="/event" component={ EventPage } />
              </div>
            </Content>
            <Footer className="footer">
              项目地址：{ ' ' }<a href={ projectUrl }>{ projectUrl }</a>
            </Footer>
          </Layout>
        </>) }
      </ConfigProvider>
    </div>
    
  );
}

export default App;
