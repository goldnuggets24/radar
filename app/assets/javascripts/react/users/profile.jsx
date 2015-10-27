var React  = require('react');
var Avatar = require('./Avatar.jsx');
var Bio    = require('./Bio.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Profile">
        <h2 className="Profile-title">{this.props.name}</h2>
        <div className="Profile-body">
          <Avatar imgSrc={this.props.email} />
          <Bio text={this.props.name} />
        </div>
      </div>
    )
  }
});