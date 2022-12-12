import React, { useState } from 'react';

require('./index.css');

export default () => {
    const [list, setList] = useState([]);

    //挂载update方法，跨iframe数据传递，更新
    window.update = params => {
      setList(params);
    }


  return <div id="drop-box">
    { list.map((item) =>
        <div className="item" key={ item.name } onClick={ () => alert('点击事件: ' + item.name) }>元素{ item.name }</div>
    ) }
  </div>
}