import React from 'react';
import Rebase from 're-base';
import CommonItems from '../common-items';
import Header from './Header';
import { ListItems } from './ListItems';

// TODO: put your Firebase URL in the quotes below
var base = Rebase.createClass('');

let ListManager = React.createClass({
    getInitialState: function() {
        return {
            items: {},
            notes: {}
        };
    },
    componentDidMount: function() {
        base.syncState(this.props.params.listId + '/items', {
            context: this,
            state: 'items'
        });
    },
    addItem: function(item) {
        var timestamp = (new Date()).getTime();

        this.state.items['item-' + timestamp] = item;

        this.setState({ items: this.state.items });
    },
    removeItem: function(key) {
        if (confirm('Are you sure you wanna remove this?')) {
            this.state.items[key] = null;

            this.setState({ items: this.state.items });
        }
    },
    loadCommonItems: function() {
        this.setState({ items: CommonItems });
        console.log('loaded common items');
    },
    render: function() {
        return (
            <div className="list-manager">
                <Header subtitle={ this.props.params.listId } />

                <div className="content">
                    <ListItems items={ this.state.items }
                        addItem={ this.addItem }
                        removeItem={ this.removeItem }
                        loadCommonItems={ this.loadCommonItems } />
                </div>
            </div>
        )
    }
});

export default ListManager;
