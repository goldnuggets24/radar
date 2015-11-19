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
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  displayName: 'Profile',

  handleSubmit: function(i, role) {
    debugger;
    // uncheck / check based on selection
    var selected_user = ({});
    if (this.props.users.map(function(user){ if (user.id == i) {selected_user = user} }));
    var myArray = selected_user.events.map(function(i) {return i.id});

    if (this.refs["team_lead_checkbox-"+i].state.switched == true) {

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

  render: function() {
    var rows = [];

    var hidden = {
      display: 'none'
    }

    var visible = {
      display: 'block'
    }
    // selectedEvent as object
    var s = ({});
    for(var e=0;e<this.props.events.length;e++)if(this.props.events[e].id == this.props.selectedEvent){s = this.props.events[e]}

    for (var i=0; i < this.props.users.length; i++) {
      // check / uncheck users depending on which event is selected
      var right = false;
      var is_team_lead = false;
      var myArray = this.props.users[i].events.map(function(i) {return i.id});
      if ($.inArray(this.props.selectedEvent, myArray) != -1) {var right = true}
      // is user a team lead for selected event?
      if (s.team_lead == this.props.users[i].id) {is_team_lead = true}

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
              <Checkbox label="Staff" ref={"staff_checkbox-"+this.props.users[i].id} key={this.props.id} defaultChecked={right} className={this.props.first_name} onCheck={this.handleSubmit.bind(this, this.props.users[i].id)} />
            </div>

            <CardMedia key={this.props.id} expandable={true} overlay={<CardTitle title={this.props.users[i].first_name} subtitle="subtitle"/>}>
              <img key={this.props.id} src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardTitle key={this.props.id + 1} title={this.props.users[i].city} subtitle={this.props.users[i].email}/>
            <CardActions key={this.props.id} expandable={true}>
            </CardActions>
          </Card>
        </div>
      )
    }
    return <div key={1}>{rows}</div>;
  }
});