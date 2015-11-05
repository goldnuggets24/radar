React = require('react')
ReactDOM = require('react-dom')

Event = React.createClass

	getInitialState: ->
    	edit: false

	handleDelete: (e) ->
      e.preventDefault()
      $.ajax
        method: 'GET'
        url: "/events/"
        dataType: 'JSON'
        success: (data) =>
        	window.ostrich = data
    
  render: -> 
    React.DOM.tr null,
      React.DOM.td null, @props.event.date
      React.DOM.td null, @props.event.title
      React.DOM.td null, @props.event.description
      React.DOM.td null,
      	React.DOM.a
            className: 'btn btn-danger'
            onClick: @handleDelete
            'Delete'

module.exports = Event