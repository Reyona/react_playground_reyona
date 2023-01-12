import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import RouterRoot from './routers';
import store from './store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 难怪之前render总是被执行两次 原来是开发环境+严格模式
  // <React.StrictMode>
    <Provider store={store}>
      <RouterRoot />
    </Provider>
  // </React.StrictMode>
);

// document.getElementById('root')?.addEventListener('click', e => {
//   console.log('root原生:点击了===', e);
// })

// document.addEventListener('click', e => {
//   console.log('document原生:点击了===', e);
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
