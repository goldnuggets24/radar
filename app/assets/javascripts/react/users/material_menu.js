var Menu = require('material-ui/lib/menus/menu');
var MenuItem = require('material-ui/lib/menus/menu-item');

var MaterialMenu = React.createClass({
    render: function() {
        return (
          <Menu>
             <MenuItem primaryText="Maps" />
             <MenuItem primaryText="Books" />
             <MenuItem primaryText="Flights" />
             <MenuItem primaryText="Apps" />
          </Menu>
        );
    }
});