// hooks组件 【跟动物书一样 React的未来（官方主推】
import React, { useEffect, useState } from "react";
import { Button } from "antd";

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

const HelloHooks = (props: Greeting) => {
  // 定义 [组件的状态，设置状态的方法]，给定状态的初始值：不需要再定义类型
  const [count, setCount] = useState(0);
  const [text, setText] = useState<string | null>(null);

  // 只有当 count 改变时，渲染逻辑才会执行。
  useEffect(() => {
    if (count > 5) {
      setText(", 休息一下吧！");
    }
    if (count > 10) {
        setCount(0);
        setText(null);
      }
  }, [count]);

  return (
    <div>
      <span>您点击了 {count} 次</span><span>{ text }</span>
      <Button onClick={() => setCount(count + 1)}>hello {props.name}</Button>
    </div>
  );
};

HelloHooks.defaultProps = {
  firstName: "",
  lastName: "",
};

export default HelloHooks;