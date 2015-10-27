var React = require('react');
var ReactDOM = require('react-dom');
var Check = require('material-ui/lib/checkbox');

var CheckBox = React.createClass({
	displayName: 'CheckBox',
	_handleOnClick: function(i) {
      this.props.onFilterLinkClick(i);
      $('.filter_buttons a').css("color", "blue");
      return $('.' + i).css("color", "red");
    },
    render: function() {
        return (
        	<div className="pharaoh">
				sgdff
			</div>
        );
    }
});

ReactDOM.render(
  <CheckBox />,
  document.getElementById('checkboxes')
);