var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require("material-ui/lib/date-picker/calendar");
var Events = require('./events.js.coffee');
var EventForm = require('./event_form.js.coffee');
var Event = require('./event.js.coffee');
var update = require('react-addons-update');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

window.Calendar = React.createClass({

	getInitialState: function() {
    	return {
      		events: this.props.data
    	};
  	},

  	getDefaultProps: function() {
    	events: []
	},

	_handleDayTouchTap: function(e, date) {
    	$( "input[name='date']").val(date);
  	},

  addEvent: function(event) {
    var events;
    events = update(this.state.events, {
      $push: [event]
    });
    return this.setState({
      events: events
    });
  },

  render: function() {
    var event;
    return React.DOM.div({
      className: 'events'
    }, React.DOM.h2({
      className: 'title'
    }, 'Events'), React.DOM.table({
      className: 'table table-bordered'
    }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Date'), React.DOM.th(null, 'Title'), React.DOM.th(null, 'Description'))), React.DOM.tbody(null, (function() {
      var i, len, ref, results;
      ref = this.state.events;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        event = ref[i];
        results.push(React.createElement(Event, {
          key: event.id,
          event: event
        }));
      }
      return results;
    }).call(this))), React.createElement(Calendar, {events: this.state.events, onDayTouchTap: this._handleDayTouchTap}), React.createElement(EventForm, {
      handleNewEvent: this.addEvent
    }));
  }
});

