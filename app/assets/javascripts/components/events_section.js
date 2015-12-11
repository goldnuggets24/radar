var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require('./events_calendar/calendar');
var EventForm = require('./event_form.js.coffee');
var Event = require('./event.js.coffee');
var update = require('react-addons-update');
var AppBar = require('material-ui/lib/app-bar');
var injectTapEventPlugin = require('react-tap-event-plugin');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var NewEvent = require('./events/new_event.jsx');
injectTapEventPlugin();

window.date = ''
window.fc = ({})
window.new_event = ({})

window.EventsSection = React.createClass({

  componentDidMount: function(){
    fc.day = (data) => {
      this.setState({fc_clicked_date: data});
    };
    new_event.dialog = (data) => {
      this.setState({new_event_clicked_event: data});
    };
  },

	getInitialState: function() {
    	return {
          fc_clicked_date: '',
          new_event_clicked_event: false,
      		events: this.props.data,
          all_events: this.props.all_events,
          openDialogStandardActions: false,
          openDialogCustomActions: false,
          openDialogScrollable: false
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
    console.log('boston');
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

  _handleCustomDialogCancel: function() {
    this.setState({
      openDialogCustomActions: false,
      new_event_clicked_event: false
    });
  },

  _handleRequestClose: function(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false,
      openDialogCustomActions: false,
      openDialogScrollable: false
    });
  },

  fullCalendar: function(events) {
    $('#full-calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2015-12-12',
      editable: true,
      events: events,
      eventClick: function(calEvent, jsEvent, view) {
        // window.open('/events/' + calEvent.id);
        new_event.dialog(true);
        $(this).css('border-color', 'green');
      },
      dayClick: function(date, jsEvent, view) {
        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('Current view: ' + view.name);
        $(this).css('background-color', 'red');
        fc.day(date.format());
        location.href = '/events/new?date=' + date.format();
      }
    });
  },

  render: function() {

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />
  ];

    this.fullCalendar(this.state.events);

    var event;
    return React.DOM.div({
      className: 'events'
    }, React.DOM.h2({
      className: 'title'
    }, ''), React.createElement(AppBar, { 
        title: 'Add Event',
        className: 'hamburger',
        isInitiallyOpen: true
      }), React.createElement(Dialog, { 
        title: 'Add a New Event',
        className: 'new-event',
        open: this.state.new_event_clicked_event,
        onRequestClose: this._handleRequestClose,
        actions: customActions
      }, 
      React.createElement(NewEvent, { 
      })
      ), );
  }
});
