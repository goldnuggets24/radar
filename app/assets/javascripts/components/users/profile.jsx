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

  handleSubmit: function(e) {
    if ($(this.getDOMNode()).find('input:checked').is(':checked')) {
      $.get('/events/' + this.props.selectedEvent + '/add_user', {
        user: e
      }, (function(_this) {
      })(this), 'JSON');
    }
  },

  render: function() {

    var myArray = this.props.user_events.map(function(i) {return i.id});

    if ($.inArray(this.props.selectedEvent, myArray) != -1) {var right = true} else {var right = false}

    debugger;

    return (
      <div className="col-md-5">
        <Card className="card-class" initiallyExpanded={false}>
          <CardHeader
            title={this.props.first_name + ' ' + this.props.last_name}
            subtitle={this.props.city}
            actAsExpander={true}
            showExpandableButton={true} 
            avatar="http://lorempixel.com/100/100/nature/"/>
          <Checkbox key="sddgf" defaultChecked={right} onCheck={this.handleSubmit.bind(this, this.props.id)} />
          <CardMedia expandable={true} overlay={<CardTitle title={this.props.first_name} subtitle="subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardTitle title={this.props.city} subtitle={this.props.email}/>
          <CardActions expandable={true}>
          </CardActions>
        </Card>
      </div>
    )
  }
});