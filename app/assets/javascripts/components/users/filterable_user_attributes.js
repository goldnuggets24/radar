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
			<div className="filter-buttons">
				<h4 className="filter-by-role">Filter:</h4>
				<h5 className="black">Sex</h5>
				<Checkbox className="male" ref="Male" value="Male" name="checkboxName1" onCheck={this.handleChange} label="Male"/>
				<Checkbox className="female" ref="Female" value="Female" name="checkboxName1" onCheck={this.handleChange} label="Female"/>
				<h5 className="black">Ethnicity</h5>
				<Checkbox className="white" ref="White" value="White" name="checkboxName1" onCheck={this.handleChange} label="White"/>
				<Checkbox className="black" ref="Black" value="Black" name="checkboxName1" onCheck={this.handleChange} label="Black"/>
			</div>
		);
	}
});