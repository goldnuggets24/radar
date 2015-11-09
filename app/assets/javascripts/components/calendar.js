var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require("material-ui/lib/date-picker/calendar");
var EventForm = require('./event_form.js.coffee');
var Event = require('./event.js.coffee');
var update = require('react-addons-update');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

window.date = ''
window.Calendar = React.createClass({

	getInitialState: function() {
    	return {
      		events: this.props.data,
          all_events: this.props.all_events
    	};
  	},

	_handleDayTouchTap: function(e, date) {
    window.date = date;
    $.ajax({
      method: 'GET',
      data: {date},
      url: "/events.json",
      dataType: 'JSON',
      success: function(data) {
          this.setState({
            events: data.events
          });
      }.bind(this)
    });
    $('input[name="date"]').attr('value', date);
  },

  addEvent: function(event, all_event) {
    var events;
    var all_events;
    all_events = update(this.state.all_events, {
      $push: [event]
    });
    events = update(this.state.events, {
      $push: [event]
    });
    return this.setState({
      events: events,
      all_events: all_events
    });
  },

  deleteEvent: function(event) {
    var events, index;
    events = this.state.events.slice();
    index = events.indexOf(event);
    events.splice(index, 1);
    return this.replaceState({
      events: events,
      all_events: this.props.all_events
    });
  },

  updateEvent: function(event, data) {
    debugger;
    var events, index;
    index = this.state.events.indexOf(event);
    events = update(this.state.events, {
      $splice: [[index, 1, data]]
    });
    return this.replaceState({
      events: events,
      all_events: this.props.all_events
    });
  },

  render: function() {
    var event;
    return React.DOM.div({
      className: 'events'
    }, React.DOM.h2({
      className: 'title'
    }, ''), React.createElement(Calendar, {events: this.state.events, all_events: this.state.all_events, onDayTouchTap: this._handleDayTouchTap}), React.DOM.table({
      className: 'table table-bordered'
    }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Date'), React.DOM.th(null, 'Title'), React.DOM.th(null, 'Description'), React.DOM.th(null, 'Users'), React.DOM.th(null, 'Actions'))), React.DOM.tbody(null, (function() {
      var i, len, ref, results;
      ref = this.state.events;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        event = ref[i];
        results.push(React.createElement(Event, {
          key: event.id,
          handleDeleteEvent: this.deleteEvent,
          handleEditEvent: this.updateEvent,
          event: event
        }));
      }
      return results;
    }).call(this))), React.createElement(EventForm, {
      handleNewEvent: this.addEvent, events: this.state.events, all_events: this.state.all_events
    }));
  }
});

