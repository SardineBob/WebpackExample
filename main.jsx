import React from 'react'
import ReactDOM from 'react-dom'
import CounterForReactState from './CounterForReactState'
import CounterForMobX from './CounterForMobX'
import AppStore from './AppStore'
import { Provider } from 'mobx-react';

const MyStore = {
    countStore: new AppStore()
}
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                哈囉，react<br />
                <hr />
                <CounterForReactState />
                <hr />
                <Provider {...MyStore}>
                    <CounterForMobX aa='test' />
                </Provider>
            </div>
        )
    }
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));