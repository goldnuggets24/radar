React = require('react')
update = require('react-addons-update')
EventForm = require('./event_form.js.coffee')
ReactDOM = require('react-dom')
Event = require('./event.js.coffee')

window.Events = React.createClass

  getInitialState: ->
    events: @props.data

  getDefaultProps: ->
    events: []

  addEvent: (event) ->
    events = update(@state.events, { $push: [event] })
    @setState events: events

  deleteEvent: (event) ->
    events = @state.events.slice()
    index = events.indexOf event
    events.splice index, 1
    @replaceState events: events

  render: ->
    React.DOM.div
      className: 'events'
      React.DOM.h2
        className: 'title'
        'Events'
      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Date '
            React.DOM.th null, 'Title'
            React.DOM.th null, 'Description'
            React.DOM.th null, 'Actions'
        React.DOM.tbody null,
          for event in @state.events
            React.createElement Event, key: event.id, event: event, handleDeleteEvent: @deleteEvent
      React.createElement EventForm, handleNewEvent: @addEvent

module.exports = Events