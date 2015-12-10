var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

window.NewEvent = React.createClass({
	displayName: 'NewEvent',

	getInitialState: function() {
	    return {
	    	id: this.props.data.id,
			title: this.props.data.title
	    };
	  },

		_onTextChange: function(i, value) {
			this.setState({ title: i.target.value });

			$.ajax({
			  url: "/events/" + this.state.id,
			  data: 'event='+ this.state.title,
			  type: 'PUT'
			});
		},

	  render: function() {

	        return (
	        	<div className="create-event-form">

			      	<TextField
			          	type='text'
						ref='titlefield'
						value={this.state.title}
						onChange={this._onTextChange} />

				</div>
	        );
	    }
});
