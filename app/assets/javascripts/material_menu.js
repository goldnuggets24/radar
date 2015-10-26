var React = require('react');
var ReactDOM = require('react-dom');
var Mui = require ('material-ui');
var Menu = require('material-ui/lib/menus/menu');
var MenuItem = require('material-ui/lib/menus/menu-item');
var AppBar = require('material-ui/lib/app-bar');

var MaterialMenu = React.createClass({
    render: function() {
        return (
          <Menu>
          		<AppBar />
				<MenuItem primaryText="Maps" />
				<MenuItem primaryText="Books" />
				<MenuItem primaryText="Flights" />
				<MenuItem primaryText="Apps" />
          </Menu>
        );
    }
});

ReactDOM.render(
  <MaterialMenu />,
  document.getElementById('test')
);