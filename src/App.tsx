import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/demo/Hello';
import HelloClass from './components/demo/HelloClass';
import HelloHooks from './components/demo/HelloHooks';
import LoadingHOC from './components/demo/LoadingHOC';
import LoadingHooks from './components/demo/LoadingHooks';

function App() {
  let [loading, setLoading] = useState(true); // LoadingHOC所用参数
  setTimeout(() => setLoading(false), 3000); // 3秒后loading完成

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <Hello name="function comp" />

      <HelloClass name="class comp" />
      <LoadingHOC name="loading higher order comp" loading={loading} />

      <HelloHooks name="hooks comp" />
      <LoadingHooks><HelloHooks name="loading hooks comp" /></LoadingHooks>


    </div>
  );
}

export default App;
