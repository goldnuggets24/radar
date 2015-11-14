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

module.exports = React.createClass({
  displayName: 'Profile',

  handleSubmit: function(i) {
    // uncheck / check based on selection
    var selected_user = ({});
    if (this.props.users.map(function(user){ if (user.id == i) {selected_user = user} }));
    var myArray = selected_user.events.map(function(i) {return i.id});

    if ($.inArray(this.props.selectedEvent, myArray) == -1) {
      $.get('/events/' + this.props.selectedEvent + '/add_user', {
        user: i
      }, (function(_this) {
      })(this), 'JSON');
    } else {
      $.get('/events/' + this.props.selectedEvent + '/remove_user', {
        user: i
      }, (function(_this) {
      })(this), 'JSON');
    }
      this.props.onCheckedEvent(i);
  },

  render: function() {
    var rows = [];

    for (var i=0; i < this.props.users.length; i++) {
      // check / uncheck users depending on which event is selected
      var right = false;
      var myArray = this.props.users[i].events.map(function(i) {return i.id});
      if ($.inArray(this.props.selectedEvent, myArray) != -1) {var right = true}

      rows.push(
        <div className="col-md-5">
          <Card key={this.props.id} className="card-class" initiallyExpanded={false}>
            <CardHeader
              key={this.props.id}
              title={this.props.users[i].first_name + ' ' + this.props.users[i].last_name}
              subtitle={this.props.users[i].city}
              actAsExpander={true}
              showExpandableButton={true} 
              avatar="http://lorempixel.com/100/100/nature/"/>
            <Checkbox ref="checkbox" key={this.props.id} defaultChecked={right} className={this.props.first_name} onCheck={this.handleSubmit.bind(this, this.props.users[i].id)} />
            <CardMedia key={this.props.id} expandable={true} overlay={<CardTitle title={this.props.users[i].first_name} subtitle="subtitle"/>}>
              <img src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardTitle key={this.props.id} title={this.props.users[i].city} subtitle={this.props.users[i].email}/>
            <CardActions key={this.props.id} expandable={true}>
            </CardActions>
          </Card>
        </div>
      )
    }
    return <div>{rows}</div>;
  }
});