// 函数组件React.FC 【不知道好不好 跟hooks差不多又不如hooks简洁】
import { Button } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import './Hello.css';

interface Greeting {
    name: string;
    firstName?: string;
    lastName?: string;
}

// React.FC<P>必须指定泛型P的类型 P就是props的类型 在函数参数里就不用再写props类型了
const Hello: React.FC<Greeting> = ({ name, firstName, lastName }) => {
    return (<div className="hello-container">
        <SmileTwoTone onClick={e => console.log('click icon!')} />
        firstName: {firstName}; lastName: { lastName }
        <Button className="hello-button" onClick={e => alert(`hello ${name}`)}>hello {name}</Button>
    </div>);
};
Hello.defaultProps = {
    firstName: "aaaa",
    lastName: "bb22",
};

export default Hello;