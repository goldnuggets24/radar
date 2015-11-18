React = require('react')
ReactDOM = require('react-dom')

EventForm = React.createClass

  getInitialState: ->
    title: ''
    date: ''
    description: ''

  valid: ->
    @state.title && @state.description

  handleChange: (e) ->
    name = e.target.name
    @setState "#{ name }": e.target.value

  handleSubmit: (e) ->
    e.preventDefault()
    $.post '', { event: @state, new_event: true, date: $('input[name="date"]').val() }, (data) =>
      @props.handleNewEvent data
      @setState @getInitialState()
    , 'JSON'

  render: ->
    React.DOM.form
      className: 'form-inline'
      onSubmit: @handleSubmit
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'text'
          className: 'form-control date'
          placeholder: if window.date? then window.date else 'Date'
          name: 'date'
          value: if window.date? then window.date else 'Date'

      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'text'
          className: 'form-control'
          placeholder: 'Title'
          name: 'title'
          value: @state.title
          onChange: @handleChange
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'text'
          className: 'form-control description'
          placeholder: 'Description'
          name: 'description'
          value: @state.description
          onChange: @handleChange
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary create-event'
        disabled: !@valid()
        'Create event'

module.exports = EventForm