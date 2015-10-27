var React = require('react');
var ReactDOM = require('react-dom');

var FilterableUserAttributes = React.createClass({

	render: function() {
  		return (
			<div className="filter-buttons">
				<h3>Filterable Categories</h3>
				<a href="#">Admin</a>
				<br />
				<a href="#">User</a>
			</div>
		);
	}
});