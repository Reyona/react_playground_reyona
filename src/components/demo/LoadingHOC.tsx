// 高阶组件higher order comp 【问题也多 官方推荐用hooks取代】
import React, { Component } from "react";
// 需要被包装的组件 可以是函数组件也可以是类组件也可以是hooks组件 不限制
import Hello from "./Hello";
import HelloClass from "./HelloClass";
import HelloHooks from "./HelloHooks";

interface Loading {
  loading: boolean;
}

/*
 ** WrapperComponent: 需要被包装的组件 可以是函数组件也可以是类组件也可以是hooks组件 不限制
 *  需要调用方多传一个参数loading
 */
function LoadingHOC<P>(WrapperComponent: React.ComponentType<P>) {
  // 定义props为P和Loading的交叉类型
  return class extends Component<P & Loading> {
    render() {
      const { loading, ...props } = this.props; // 解构props，拆分出loading和其他props，loading在这里用，其他props传给被包装的组件

      return loading ? (
        <div>Loading for 3 seconds...</div>
      ) : (
        <WrapperComponent {...(props as any)} /> // {...props}属性透传 todo:这里本来是(props as P) 不知道报错是什么意思？？？
      );
    }
  };
}

// 导出经过高阶组件包装后的组件
export default LoadingHOC(HelloHooks);