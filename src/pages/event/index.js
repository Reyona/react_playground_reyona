import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Example extends Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }
    componentDidMount() {
        document.getElementById('example').addEventListener('click', e => {
            console.log('Example原生:点击了===', e);
            // 在原生事件上阻止冒泡
            // e.stopPropagation();
            // e.stopImmediatePropagation();
        });
    }

    handleClick = (e) => {
        console.log('Example合成:点击了===', e);
        // 在合成事件上组织冒泡
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
    };


    render() {
        console.log('render');
        return (<>
            这里是测试合成事件冒泡的。<br />
            <div
                style={{ border: '1px solid black', height: '50px', lineHeight: '50px', textAlign: 'center' }}
                id="example"
                onClick={this.handleClick}>点击这里查看事件冒泡</div>
        </>);
    }
}

class Echo extends Component {
    componentDidMount() {
        const parentDom = ReactDOM.findDOMNode(this);
        const childrenDom = parentDom.querySelector(".button");

        childrenDom.addEventListener('click', this.onDomChildClick, false);
        childrenDom.addEventListener('click', this.onDomChildClickCapture, true);
        parentDom.addEventListener('click', this.onDomParentClick, false);
        parentDom.addEventListener('click', this.onDomParentClickCapture, true);
    }
    onDomChildClick = (e) => {
        // e.stopPropagation( )
        console.log('原生事件child--冒泡');
    }
    onDomChildClickCapture = (e) => {
        console.log('原生事件child--捕获');
    }
    onDomParentClick = (e) => {
        console.log('原生事件parent--冒泡');
    }
    onDomParentClickCapture = (e) => {
        console.log('原生事件parent--捕获');
    }
    onReactChildClick = (e) => {
        // e.stopPropagation()
        console.log('合成事件child--冒泡');
    }
    onReactParentClick = () => {
        console.log('合成事件parent--冒泡');
    }
    render() {
        return (
            <div className="parent" onClick={this.onReactParentClick}>
                <button className="button" onClick={this.onReactChildClick}>点击</button>
            </div>
        )
    }
}


export default function EventPage() {
    return (<Example />);
};