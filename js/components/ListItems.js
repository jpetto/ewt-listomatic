import React from 'react';
import Common from '../common';

var ListItem = React.createClass({
    render: function() {
        return (
            <li>
                <a href={ this.props.details.url }>{ this.props.details.name }</a>
                <span className="price">
                    { Common.formatUSD(this.props.details.price) }</span>
                <button type="button"
                    onClick={ this.props.removeItem.bind(null, this.props.index) }>&otimes;</button>
            </li>
        )
    }
});

var AddItemForm = React.createClass({
    createItem: function(e) {
        e.preventDefault();

        var item = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            url: this.refs.url.value
        };

        // need to call addItem somehow...
        this.props.addItem(item);

        // reset the form
        this.refs.itemForm.reset();
    },
    render: function() {
        return (
            <form className="item-edit" ref="itemForm"
                onSubmit={ this.createItem }>

                <input type="text" ref="name" placeholder="Item Name" />
                <input type="number" step="0.01" ref="price"
                    placeholder="Item Price" />
                <input type="url" ref="url" placeholder="Item URL" />

                <button type="submit" className="btn">+ Add Item</button>
            </form>
        )
    }
});

export var ListItems = React.createClass({
    renderItem: function(key) {
        return <ListItem key={ key } index={ key }
            details={ this.props.items[key] }
            removeItem={ this.props.removeItem } />
    },
    render: function() {
        var itemIds = Object.keys(this.props.items);

        var total = itemIds.reduce(function(prevTotal, key) {
            var item = this.props.items[key];

            return prevTotal + parseInt(item.price, 10);
        }.bind(this), 0);

        return (
            <section className="list-items">
                <h3>List Items</h3>

                <ul className="items">
                    { itemIds.map(this.renderItem) }
                    <li>
                        <strong>Total:</strong>
                        { Common.formatUSD(total) }
                    </li>
                </ul>

                <AddItemForm addItem={ this.props.addItem } />

                <br />

                <button type="button" className="btn"
                    onClick={ this.props.loadCommonItems }>Load Items</button>
            </section>
        )
    }
});
