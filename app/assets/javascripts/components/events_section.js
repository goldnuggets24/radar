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
      lazyFetching: false,
      editable: true,
      events: events,
      eventClick: function(calEvent, jsEvent, view) {
        $(this).css('border-color', 'green');
      },
      dayClick: function(date, jsEvent, view) {
        fc.day(date.format());
        new_event.dialog(true);
      }
    });
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    $.post('/events', {
      title: $('#mui-id-0').val(),
      address: $('#mui-id-1').val(),
      location: $('#mui-id-2').val(),
      description: $('#ql-editor-1').html(),
      start_date: $('#mui-id-4').val(),
      end_date: $('#mui-id-5').val(),
      start_time: $('#mui-id-6').val(),
      end_time: $('#mui-id-7').val()
    });
    $.ajax({
      method: 'GET',
      url: "/events.json",
      dataType: 'JSON',
      success: function(data) {
        this.setState({
          events: data,
          all_events: data
        });
      }.bind(this)
    });
    // live update cal to add new events
    $('#full-calendar').fullCalendar('removeEvents');
    $('#full-calendar').fullCalendar('addEventSource', '/events.json' );
  },

  render: function() {

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />,
      <FlatButton
        label="Submit"
        type="submit"
        className="btn pull-right clearfix btn-primary create-event"
        primary={true}
        onTouchTap={this._handleSubmit} />
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
        autoDetectWindowHeight: true,
        autoScrollBodyContent: true,
        className: 'new-event',
        open: this.state.new_event_clicked_event,
        onRequestClose: this._handleRequestClose,
        actions: customActions
      }, 
      React.createElement(NewEvent, { 
        fc_clicked_date: this.state.fc_clicked_date
      })
      ), );
  }
});
