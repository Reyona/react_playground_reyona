import React from "react";

class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join('; ')}</div>;
    }
}

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['111']
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const words = this.state.words;
        words.push(Math.floor(Math.random().toFixed(2) * 100))
        this.setState({
            words,
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>click</button>
                <ListOfWords words={this.state.words} />
            </div>
        )
    }
}

export default WordAdder;