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

module.exports = React.createClass({
  render: function() {
    return (
      <div className="col-md-5">
        <Card initiallyExpanded={true}>
          <CardHeader
            title={this.props.name}
            subtitle="Subtitle"
            avatar={<Avatar>A</Avatar>}/>
          <CardHeader
            title="Demo Url Based Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"/>
          <CardMedia overlay={<CardTitle title={this.props.name} subtitle="Subtitle"/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardTitle title={this.props.email} subtitle="Subtitle"/>
          <CardActions>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
          <CardText expandable={true}>
            <div className="Profile">
              <h2 className="Profile-title">{this.props.name}</h2>
              <div className="Profile-body">
                <Bio text={this.props.name} />
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
});