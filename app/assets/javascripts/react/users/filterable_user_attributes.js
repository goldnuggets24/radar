var React = require('react');
var ReactDOM = require('react-dom');
var Checkbox = require('material-ui/lib/checkbox');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
	mixins: [LinkedStateMixin],

  	handleChange: function(event) {
  		debugger;
  		if(this.refs[event.target.value].isChecked() == true) {
    		this.props.onFilterLinkClick(event.target.value);
    	} else {
    		this.props.onFilterLinkClick('');
    	}
  	},

	render: function() {

  		return (
  			<div className="col-md-12">
				<div className="filter-buttons">
					<h3>Filter by Role</h3>
					<Checkbox className="admin" ref="admin" value="admin" name="checkboxName1" onCheck={this.handleChange} label="Admin"/>
					<Checkbox className="user" ref="user" value="user" name="checkboxName1" onCheck={this.handleChange} label="User"/>
				</div>
			</div>
		);
	}
});