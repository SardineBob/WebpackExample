import React from 'react'
import FlowList from './FlowList'
import { arrayMove, SortableContainer } from 'react-sortable-hoc'

const SortableFlowList = SortableContainer(FlowList);

export default class FlowSortable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['1', '2', '3', '4']
        };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        console.log(oldIndex, newIndex);
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    }

    render() {
        return <SortableFlowList items={this.state.items} onSortEnd={this.onSortEnd} />
    }
}