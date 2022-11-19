import { Button } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import './Hello.css';

interface Greeting {
  name: string;
}

const Hello = (props: Greeting) => {
    return (<>
        <SmileTwoTone />
        <Button className="hello-button" onClick={e => alert(`hello ${props.name}`)}>hello {props.name}</Button>
    </>);
};

export default Hello;