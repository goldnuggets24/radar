React = require('react')
ReactDOM = require('react-dom')

Event = React.createClass

  getInitialState: ->
    edit: false
    
  render: ->  	
    React.DOM.tr null,
      React.DOM.td null, @props.event.date
      React.DOM.td null, @props.event.title
      React.DOM.td null, @props.event.description

module.exports = Event