import React from 'react'

export default class CounterForReactState extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cnt: 0 };
    }
    render() {
        return (
            <div>
                <h1>React State</h1>
                計數器：{this.state.cnt}<br />
                <button onClick={this.onAddClick.bind(this)}>+</button>
                <button onClick={this.onSubClick.bind(this)}>-</button>
            </div>
        )
    }
    onAddClick() {
        this.setState((curState) => {
            return { cnt: curState.cnt + 1 };
        });
    }
    onSubClick() {
        this.setState((curState) => {
            return { cnt: curState.cnt - 1 };
        });
    }
}