import React, { Component } from 'react'
import { flushSync } from 'react-dom'

class Example extends Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }
    // 目前是concurrent模式
    doSetState = () => { // 看执行的先后顺序和值得变化
        this.setState({ val: this.state.val + 1 });
        console.log('1: ', this.state.val); // 0

        this.setState({ val: this.state.val + 1 });
        console.log('2: ', this.state.val); // 0

        setTimeout(() => {
            this.setState({ val: this.state.val + 1 });
            console.log('3: ', this.state.val); // 1

            this.setState({ val: this.state.val + 1 });
            console.log('4: ', this.state.val); // 1
        }, 0);
    }

    // 如下代码为shouldComponentUpdate+setState导致死循环的测试!!
    // componentDidMount() {
    //     this.setState({ val: this.state.val + 1 });
    // }
    // shouldComponentUpdate() {
    //     this.setState({ val: this.state.val + 1 }); // 死循环
    //     return true;
    // }

    plus1 = () => {
        console.log("增加1前", this.state.val);
        this.setState({
            val: this.state.val + 1,
        });
        console.log("增加1后", this.state.val);
    };

    plus2 = () => {
        console.log("增加2前", this.state.val);
        // 这样会被合并为一条setState 且异步更新
        this.setState({
            val: this.state.val + 1,
        });
        this.setState({
            val: this.state.val + 1,
        });
        // 这样会分开为两次setState 且同步更新
        // flushSync(() => {
        //     this.setState({
        //         val: this.state.val + 1,
        //     });
        // })
        // flushSync(() => {
        //     this.setState({
        //         val: this.state.val + 1,
        //     });
        // })
        console.log("增加2后", this.state.val);
    };

    reduce1 = () => {
        setTimeout(() => {
            console.log("减少1前", this.state.val);
            this.setState({
                val: this.state.val - 1,
            });
            console.log("减少1后", this.state.val);
        }, 0);
    };

    render() {
        console.log('render');
        return (<>
            This is an example for this.setState().<br />
            this.state.val: {this.state.val}<br />
            <br />
            <button onClick={this.doSetState}>do setState</button><br />
            <br />
            <button onClick={this.plus1}>增加1</button>
            <button onClick={this.plus2}>增加2</button>
            <button onClick={this.reduce1}>减少1</button>
        </>);
    }
}

export default Example;