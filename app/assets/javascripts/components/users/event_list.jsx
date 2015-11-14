var React = require('react');
var ReactDOM = require('react-dom');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Checkbox = require('material-ui/lib/checkbox');
var ListDivider = require('material-ui/lib/lists/list-divider');

module.exports = React.createClass({
	displayName: 'EventList',

	getInitialState: function getInitialState() {
		return {
			selectedEvent: ''
		};
	},

	_handleCheckBoxOnCheck: function(event) {
		this.props.onEventSelection(event);
	},

	render: function() {
		var rows = [];

		for (var i=0; i < this.props.events.length; i++) {
		    rows.push(
		    	<List subheader="Today" key={this.props.events[i].id}>
      				<ListItem key={this.props.events[i].id} leftCheckbox={<Checkbox ref={this.props.events[i].title} key={i} onCheck={this._handleCheckBoxOnCheck.bind(this, this.props.events[i].id)} />} primaryText={this.props.events[i].title} secondaryText={this.props.events[i].description} />
    			</List>
		    );
		}
		return <div>{rows}</div>;
	}
});

