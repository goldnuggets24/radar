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
var DatePicker = require('../events_calendar/date-picker');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="col-md-5">
        <Card className="card-class" initiallyExpanded={false}>
          <CardHeader
            title={this.props.first_name + ' ' + this.props.last_name}
            subtitle={this.props.city}
            actAsExpander={true}
            showExpandableButton={true} 
            avatar="http://lorempixel.com/100/100/nature/"/>
          <CardMedia expandable={true} overlay={<CardTitle title={this.props.first_name} subtitle="subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardTitle title={this.props.city} subtitle={this.props.email}/>
          <CardActions expandable={true}>
            <DatePicker events={this.props.events} className="addtoevent" hintText="Add to Event"/> 
          </CardActions>
        </Card>
      </div>
    )
  }
});