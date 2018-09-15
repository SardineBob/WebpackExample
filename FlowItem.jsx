import React from 'react'

export default class FlowItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {this.props.seqno} 內會 行政處 第一科 Bob
        </div>
    }
}