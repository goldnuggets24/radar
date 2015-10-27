var React = require('react');
var ReactDOM = require('react-dom');
var Checkbox = require('material-ui/lib/checkbox');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
	mixins: [LinkedStateMixin],

  	handleChange: function(event) {
  		window.allVals = [];
		$('input:checked').each(function() {
			allVals.push($(this).val());
		});
    	this.props.onFilterLinkClick(allVals);
  	},

	render: function() {

  		return (
  			<div className="col-md-12">
				<div className="filter-buttons">
					<h3>Filter by Role</h3>
					<Checkbox className="male" ref="male" value="male" name="checkboxName1" onCheck={this.handleChange} label="Male"/>
					<Checkbox className="female" ref="female" value="female" name="checkboxName1" onCheck={this.handleChange} label="Female"/>
				</div>
			</div>
		);
	}
});