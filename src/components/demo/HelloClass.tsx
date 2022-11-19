// 类组件extends Component<P, S> 【作为一种传统开发模式，会长期存在】
import React, { Component } from "react";
import { Button } from "antd";

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

interface State {
  count: number;
}

// Component中的三个泛型如下：在TypeScript中，类组件需要为props和state定义类型。
// P: props的类型，默认{}
// S: state的类型，默认{}
// SS: snapshot
class HelloClass extends Component<Greeting, State> {
  // 初始化 state
  state: State = { count: 0 }; // state是readonly的，声明好要什么state以后不能再增删
  // 默认属性值
  static defaultProps = {
    firstName: "",
    lastName: "",
  };
  render() {
    return (
        <div>
          <span>您点击了 {this.state.count} 次</span>
          <Button onClick={() => {
              this.setState({ count: this.state.count + 1 });
            }}
          >
            hello {this.props.name}
          </Button>
        </div>
    );
  }
}

export default HelloClass;