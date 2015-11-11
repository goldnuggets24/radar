import React from "react";
var ReactDOM = require('react-dom');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var DropDownMenu = require('material-ui/lib/drop-down-menu');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FontIcon = require('material-ui/lib/font-icon');
var DropDownIcon = require('material-ui/lib/drop-down-icon');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles/colors');
var Avatar = require('material-ui/lib/avatar');

let filterOptions = [
	{ payload: '', text: 'Account' },
	{ payload: '/users/edit', text: 'Edit Account' },
	{ payload: '/users/sign_out', text: 'Sign Out' },
];
let iconMenuItems = [
	{ payload: '1', text: 'Download' },
	{ payload: '2', text: 'More Info' }
];

module.exports = React.createClass({

	_handleTextFieldChange: function(e) {
        window.location.href = e.target.value;
    },

	render: function() {
  		return (
  			<Toolbar className="toolbar">
				<ToolbarGroup key={0} float="left">
					<a href="/">
						<Avatar className="logo" src="http://www.bkreader.com/wp-content/uploads/2015/10/logo.png" />
					</a>
					<FlatButton label="Home" linkButton={true} href="/" />
					<DropDownMenu className="nav-account-dropdown" onChange={this._handleTextFieldChange} menuItems={filterOptions} />
					<FlatButton secondary={true} label="Events" linkButton={true} href="/events" />
				</ToolbarGroup>
				<ToolbarGroup key={1} float="right">
					<DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
					<ToolbarSeparator/>
					<FlatButton label="Support" linkButton={true} href="/" primary={true} />
				</ToolbarGroup>
			</Toolbar>

		);
	}
});