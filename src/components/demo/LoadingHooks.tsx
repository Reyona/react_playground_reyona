import React, { useState } from "react";

interface Loading {
    children: any;
  }

const LoadingHooks = ({ children }: Loading) => { // children可以是函数组件也可以是类组件也可以是hooks组件 不限制
    let [loading, setLoading] = useState(true); // HelloHOC所用参数
    setTimeout(() => setLoading(false), 3000); // 3秒后loading完成

    return (<>
        { loading ? (<div>Loading for 3 seconds...</div>) : children }
    </>); // 之前忘记加<></> 会有报错：return type 'Element | { children: any; }' is not a valid JSX element
}

export default LoadingHooks;