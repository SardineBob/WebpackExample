import React from 'react'
import FlowItem from './FlowItem'
import { SortableElement } from 'react-sortable-hoc'

const SortableFlowItem = SortableElement(FlowItem);

export default class FlowList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list = [];
        this.props.items.forEach(function (element, index) {
            list.push(<SortableFlowItem index={index} seqno={element} />);
        });

        return <div>
            {list}
        </div>
    }
}