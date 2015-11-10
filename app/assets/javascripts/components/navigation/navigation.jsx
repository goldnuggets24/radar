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
	{ payload: '1', text: 'Home' },
	{ payload: '2', text: 'All Voice' },
	{ payload: '3', text: 'All Text' },
	{ payload: '4', text: 'Complete Voice' },
	{ payload: '5', text: 'Complete Text' },
	{ payload: '6', text: 'Active Voice' },
	{ payload: '7', text: 'Active Text' },
];
let iconMenuItems = [
	{ payload: '1', text: 'Download' },
	{ payload: '2', text: 'More Info' }
];

module.exports = React.createClass({
	render: function() {
  		return (
  			<Toolbar className="toolbar">
				<ToolbarGroup key={0} float="left">
					<a href="/">
						<Avatar className="logo" src="http://www.bkreader.com/wp-content/uploads/2015/10/logo.png" />
					</a>
					<FlatButton label="Home" linkButton={true} href="/" />
					<FlatButton secondary={true} label="Edit Account" linkButton={true} href="/users/edit" />
					<FlatButton secondary={true} label="Sign Out" linkButton={true} href="/users/sign_out" />
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