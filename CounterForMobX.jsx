import React from 'react'
import { observer, inject } from 'mobx-react'

/*const AppStore = observable({
    count: 0,
    addFunc: function () {
        AppStore.count++;
    },
    subFunc: function () {
        AppStore.count--;
    }
});*/

@inject('countStore')
@observer
export default class CounterForMobX extends React.Component {
    //@observable count = 0;

    constructor(props) {
        super(props);
    }
    render() {
        const { countStore } = this.props;
        return (
            <div>
                <h1>MobX</h1>
                計數器：{countStore.cnt}<br />
                <button onClick={countStore.add.bind(this)}>+</button>
                <button onClick={countStore.sub.bind(this)}>-</button>
                {/*計數器：{AppStore.count}<br />
                <button onClick={AppStore.addFunc.bind(this)}>+</button>
                <button onClick={AppStore.subFunc.bind(this)}>-</button>*/}
                {/*<button onClick={this.onAddClickMobX.bind(this)}>+</button>
                <button onClick={this.onSubClickMobX.bind(this)}>-</button>*/}
            </div>
        )
    }

    /*
    onAddClickMobX() {
        console.log("onAddClickMobX");
        return this.count++;
    }
    onSubClickMobX() {
        console.log("onSubClickMobX");
        return this.count--;
    }*/

}