import React from 'react';
import { History } from 'react-router';
import Header from './Header';

let ListCreator = React.createClass({
	mixins: [History],
	manageList: function(event) {
		event.preventDefault();

		var listID = this.refs.listId.value;

		this.history.pushState(null, '/list/' + listID);
	},
	render: function() {
		return (
			<div className="list-creator">
				<Header subtitle="Enter the name of a list!" />

				<div className="content">
					<form onSubmit={ this.manageList }>
						<input type="text" ref="listId" placeholder="List name" />
						<button type="submit" className="btn">+ Create List</button>
					</form>
				</div>
			</div>
		)
	}
});

export default ListCreator;
