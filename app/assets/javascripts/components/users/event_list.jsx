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
		if ($('.events-checkbox input').is(':checked')) {
			this.props.onEventSelection(event);
		} else {
			this.props.onEventSelection('');
		}
	},

	render: function() {
		var rows = [];
		for (var i=0; i < this.props.events.length; i++) {
		    rows.push(
		    	<List subheader={this.props.events[i].title} key={this.props.events[i].id}>
      				<ListItem key={this.props.events[i].id} leftCheckbox={<Checkbox className="events-checkbox" ref={this.props.events[i].date} key={i} onCheck={this._handleCheckBoxOnCheck.bind(this, this.props.events[i].id)} />} primaryText={this.props.events[i].date} secondaryText={this.props.events[i].description} />
    			</List>
		    );
		}
		return <div className="events-section"><h3 className="events-title">Events</h3>{rows}</div>;
	}
});

