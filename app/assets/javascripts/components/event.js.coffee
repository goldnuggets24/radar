React = require('react')
ReactDOM = require('react-dom')
ReactIntl = require('react-intl/lib/react-intl')
IntlMixin = ReactIntl.IntlMixin
FormattedDate = ReactIntl.FormattedDate

window.Event = React.createClass

	getInitialState: ->
		edit: false

	handleToggle: (e) ->
		e.preventDefault()
		@setState edit: !@state.edit

	handleDelete: (e) ->
		e.preventDefault()
		$.ajax
			method: 'DELETE'
			url: "/events/#{ @props.event.id }"
			dataType: 'JSON'
			success: () =>
				@props.handleDeleteEvent @props.event

	handleEdit: (e) ->
    	e.preventDefault()
	    data =
	      title: ReactDOM.findDOMNode(@refs.title).value
	      description: ReactDOM.findDOMNode(@refs.description).value
	      date: ReactDOM.findDOMNode(@refs.date).value
	    $.ajax
	      method: 'PUT'
	      url: "/events/#{ @props.event.id }"
	      dataType: 'JSON'
	      data:
	        event: data
	      success: (data) =>
	        @setState edit: false
	        @props.handleEditEvent @props.event, data

	eventRow: ->
	    React.DOM.tr null,
	      React.DOM.td null, <p>
				                <FormattedDate
				                    value={new Date(@props.event.date.substring(0,4), Number(@props.event.date.substring(5,7)) - 1, @props.event.date.substring(8,10))}
				                    day="numeric"
				                    month="long"
				                    year="numeric" />
				            </p>
	      React.DOM.td null, @props.event.title
	      React.DOM.td null, @props.event.description
	      React.DOM.td null, if typeof @props.event.users != "undefined" && typeof @props.event.users[0] != "undefined" then @props.event.users[0].first_name + ' ' + @props.event.users[0].last_name else 'Add Promotional Staff'
	      React.DOM.td null,
	        React.DOM.a
	          className: 'btn btn-default'
	          onClick: @handleToggle
	          'Edit'
	        React.DOM.a
	          className: 'btn btn-danger'
	          onClick: @handleDelete
	          'Delete'

	eventForm: ->
	    React.DOM.tr null,
	      React.DOM.td null,
	        React.DOM.input
	          className: 'form-control'
	          type: 'text'
	          defaultValue: @props.event.date
	          ref: 'date'
	      React.DOM.td null,
	        React.DOM.input
	          className: 'form-control'
	          type: 'text'
	          defaultValue: @props.event.title
	          ref: 'title'
	      React.DOM.td null,
	        React.DOM.input
	          className: 'form-control'
	          type: 'text'
	          defaultValue: @props.event.description
	          ref: 'description'
	      React.DOM.td null,
	        React.DOM.input
	          className: 'form-control'
	          type: 'text'
	          defaultValue: ''
	          ref: 'Promotional Staff'
	      React.DOM.td null,
	        React.DOM.a
	          className: 'btn btn-default'
	          onClick: @handleEdit
	          'Update'
	        React.DOM.a
	          className: 'btn btn-danger'
	          onClick: @handleToggle
	          'Cancel'

	render: ->
	    if @state.edit
	      @eventForm()
	    else
	      @eventRow()

module.exports = Event