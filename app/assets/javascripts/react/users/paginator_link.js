var React  = require('react');

module.exports = React.createClass({

  _handleOnClick: function(e) {
    e.preventDefault();
    return this.props.onPaginatorLinkClick(this.props.pageNumber);
  },

  render: function() {
    return (
    	<a href="#" onClick={this._handleOnClick}>&nbsp;</a>
    	)
  }
});