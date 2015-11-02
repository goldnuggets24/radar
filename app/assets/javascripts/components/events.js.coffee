@Events = React.createClass

  getInitialState: ->
    events: @props.data

  getDefaultProps: ->
    events: []

  addEvent: (event) ->
    events = React.addons.update(@state.events, { $push: [event] })
    @setState events: events

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
            React.DOM.th null, 'Date'
            React.DOM.th null, 'Title'
            React.DOM.th null, 'Description'
        React.DOM.tbody null,
          for event in @state.events
            React.createElement Event, key: event.id, event: event
      React.createElement EventForm, handleNewEvent: @addEvent