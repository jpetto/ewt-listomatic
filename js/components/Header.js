import React from 'react';

let Header = React.createClass({
    propTypes: {
        'subtitle': React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <header className="app-header">
                <h1>List-o-matic</h1>
                <h2>{ this.props.subtitle }</h2>
            </header>
        )
    }
});

export default Header;
