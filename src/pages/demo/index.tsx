import React, { useState } from 'react';
import logo from './logo.svg';
import './index.css';

import Hello from '@components/demo/Hello';
import HelloClass from '@components/demo/HelloClass';
import HelloHooks from '@components/demo/HelloHooks';
import LoadingHOC from '@components/demo/LoadingHOC';
import LoadingHooks from '@components/demo/LoadingHooks';

export default function Demo() {
  let [loading, setLoading] = useState(true); // LoadingHOC所用参数
  setTimeout(() => setLoading(false), 3000); // 3秒后loading完成

  return (
    <div className="Demo">
      <header className="Demo-header">
        <img src={ logo } className="Demo-logo" alt="logo" />
        <p>
          Edit <code>src/Demo/index.tsx</code> and save to reload.
        </p>
        <a
          className="Demo-link"
          href="https://react.docschina.org/docs/introducing-jsx.html"
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