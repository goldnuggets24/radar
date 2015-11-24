var React  = require('react');
var Avatar = require('./Avatar.jsx');
var Bio    = require('./Bio.jsx');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardActions = require('material-ui/lib/card/card-actions');
var CardText = require('material-ui/lib/card/card-text');
var CardTitle = require('material-ui/lib/card/card-title');
var FlatButton = require('material-ui/lib/flat-button');
var Checkbox = require('material-ui/lib/checkbox');
var DatePicker = require('../events_calendar/date-picker');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var ListDivider = require('material-ui/lib/lists/list-divider');
var Dialog = require('material-ui/lib/dialog');
var RaisedButton = require('material-ui/lib/raised-button');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableFooter = require('material-ui/lib/table/table-footer');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  displayName: 'Profile',

  getInitialState: function() {
      return {
          openDialogStandardActions: false,
          profile_toggle: false
      };
  },

  handleSubmit: function(i, role) {
    // uncheck / check based on selection
    var selected_user = ({});
    if (this.props.users.map(function(user){ if (user.id == i) {selected_user = user} }));
    var myArray = selected_user.events.map(function(i) {return i.id});

    if (this.refs[role+"_checkbox-"+i].state.switched == false) {

      // if ($.inArray(this.props.selectedEvent, myArray) == -1) {
        $.get('/events/' + this.props.selectedEvent + '/add_user', {
          user: i,
          role: role
        }, (function(_this) {
        })(this), 'JSON');
      } else {
        $.get('/events/' + this.props.selectedEvent + '/remove_user', {
          user: i,
          role: role
        }, (function(_this) {
        })(this), 'JSON');
      }
      this.props.onCheckedEvent(i);
  },

  _handleStandardDialogTouchTap: function(user) {
    this.refs['profile-dialog-'+user].show();
  },

  _condensedProfiles: function() {
    this.setState({profile_toggle: false})
  },

  _expandedProfiles: function() {
    this.setState({profile_toggle: true})
  },

  render: function() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    // table options

    var hidden = {
      display: 'none'
    }

    var visible = {
      display: 'block'
    }
    // selectedEvent as object
    var s = ({});

    for(var e=0;e<this.props.events.length;e++)if(this.props.events[e].id == this.props.selectedEvent){s = this.props.events[e]}
    
    var tables = [];
    // check / uncheck users depending on which event is selected
    var is_staff = false;
    var is_team_lead = false;
    for (var i=0; i < this.props.users.length; i++) {
      var myArray = this.props.users[i].events.map(function(i) {return i.id});
      if ($.inArray(this.props.selectedEvent, myArray) != -1) {var is_staff = true}
      // is user a team lead for selected event?
      if (s.team_lead == this.props.users[i].id) {(is_team_lead = true) && (is_staff = false)}
      tables.push(
          <TableRow>
            <TableRowColumn>{this.props.users[i].first_name + ' ' + this.props.users[i].last_name}</TableRowColumn>
            <TableRowColumn>{this.props.users[i].email}</TableRowColumn>
            <TableRowColumn>{this.props.users[i].city}</TableRowColumn>
          </TableRow>
        )
      }

    // check / uncheck users depending on which event is selected
    var rows = [];
    for (var i=0; i < this.props.users.length; i++) {
      var myArray = this.props.users[i].events.map(function(i) {return i.id});
      if ($.inArray(this.props.selectedEvent, myArray) != -1) {var is_staff = true}
      // is user a team lead for selected event?
      if (s.team_lead == this.props.users[i].id) {(is_team_lead = true) && (is_staff = false)}
      rows.push(
        <div key={this.props.id} className="col-md-5">
          <Card key={this.props.id} className="card-class" initiallyExpanded={this.props.initiallyExpanded}>
            <CardHeader
              expanded={this.props.initiallyExpanded}
              key={this.props.id}
              ref="CardHeader"
              title={this.props.users[i].first_name + ' ' + this.props.users[i].last_name}
              subtitle={this.props.users[i].city}
              actAsExpander={true}
              showExpandableButton={true} 
              avatar="http://lorempixel.com/100/100/nature/"/>
            
            <div 
              style={this.props.selectedEvent ? visible : hidden} 
              className="profile-checkboxes"
            >
              <Checkbox label="Team Leader" ref={"team_lead_checkbox-"+this.props.users[i].id} key={this.props.id} defaultChecked={is_team_lead} className={i} onCheck={this.handleSubmit.bind(this, this.props.users[i].id, 'team_lead')} />
              <Checkbox label="Staff" ref={"staff_checkbox-"+this.props.users[i].id} key={this.props.id} defaultChecked={is_staff} className={this.props.first_name} onCheck={this.handleSubmit.bind(this, this.props.users[i].id, 'staff')} />
            </div>

            <CardMedia key={this.props.id} expandable={true} overlay={<CardTitle title={this.props.users[i].first_name} subtitle="subtitle"/>}>
              <img key={this.props.id} src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardTitle key={this.props.id + 1} title={this.props.users[i].city} subtitle={this.props.users[i].email}/>
            <RaisedButton label="Show Full Profile" onTouchTap={this._handleStandardDialogTouchTap.bind(this, this.props.users[i].id)} />
            <Dialog
              ref={"profile-dialog-"+this.props.users[i].id}
              title={i.first_name}
              className={"profile-dialog"}
              actionFocus="submit"
              open={this.state.openDialogStandardActions}
              onRequestClose={this._handleRequestClose}>

              <Card key={this.props.id} className="card-class" initiallyExpanded={true}>
                <CardHeader
                  expanded={this.props.initiallyExpanded}
                  key={this.props.id}
                  ref="CardHeader"
                  title={this.props.users[i].first_name + ' ' + this.props.users[i].last_name}
                  subtitle={
                    <div>
                      <h4>Sex: {this.props.users[i].sex}</h4>
                      <h4>Ethnicity: {this.props.users[i].ethnicity}</h4>
                    </div>
                  }
                  actAsExpander={true}
                  showExpandableButton={true} 
                  avatar="http://lorempixel.com/100/100/nature/"/>
                
                <div 
                  style={this.props.selectedEvent ? visible : hidden} 
                  className="profile-checkboxes"
                >
                  <Checkbox label="Team Leader" ref={"team_lead_checkbox-"+this.props.users[i].id} key={this.props.id} defaultChecked={is_team_lead} className={i} onCheck={this.handleSubmit.bind(this, this.props.users[i].id, 'team_lead')} />
                  <Checkbox label="Staff" ref={"staff_checkbox-"+this.props.users[i].id} key={this.props.id} defaultChecked={is_staff} className={this.props.first_name} onCheck={this.handleSubmit.bind(this, this.props.users[i].id, 'staff')} />
                </div>
                <CardTitle key={this.props.id + 1} title={this.props.users[i].city} subtitle={this.props.users[i].email}/>
                <CardActions key={this.props.id} expandable={true}>
                </CardActions>
              </Card>
            </Dialog>

            <CardActions key={this.props.id} expandable={true}>
            </CardActions>
          </Card>
        </div>
        )
      }

      if (this.state.profile_toggle) {
        return <div><FlatButton label="Condensed" onTouchTap={this._condensedProfiles} />{rows}</div>
      } else {
        return <div><FlatButton label="Expanded" onTouchTap={this._expandedProfiles} />
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={this._handleCheckBoxOnCheck}>
            <TableHeader key={this.state.enableSelectAll} enableSelectAll={this.state.enableSelectAll}>
              <TableRow>
                <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
                <TableHeaderColumn tooltip='Email'>Email</TableHeaderColumn>
                <TableHeaderColumn tooltip='City'>City</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}>
              {tables}
            </TableBody>
          </Table>
          </div>
      }
    }
  });