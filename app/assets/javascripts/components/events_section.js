var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require('./events_calendar/calendar');
var EventForm = require('./event_form.js.coffee');
var Event = require('./event.js.coffee');
var update = require('react-addons-update');
var AppBar = require('material-ui/lib/app-bar');
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

window.date = ''
window.fc = ({})
window.EventsSection = React.createClass({

  componentWillMount: function(){
    fc.love = (data) => {
      this.setState({fc_clicked_date: data});
    };
  },

	getInitialState: function() {
    	return {
          fc_clicked_date: '',
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

  fullCalendar: function() {
    $('#full-calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2015-12-12',
      editable: true,
      events: [
        {
          title: 'All Day Event',
          start: '2015-12-01'
        },
        {
          title: 'Long Event',
          start: '2015-12-07',
          end: '2015-12-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-12-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-12-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2015-12-11',
          end: '2015-12-13'
        },
        {
          title: 'Meeting',
          start: '2015-12-12T10:30:00',
          end: '2015-12-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2015-12-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2015-12-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2015-12-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2015-12-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2015-12-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2015-12-28'
        }
      ],
      dayClick: function(date, jsEvent, view) {
        alert('Clicked on: ' + date.format());
        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('Current view: ' + view.name);
        // change the day's background color just for fun
        $(this).css('background-color', 'red');
        fc.love(date.format());
      }
    });
  },

  render: function() {

    this.fullCalendar();

    var event;
    return React.DOM.div({
      className: 'events'
    }, React.DOM.h2({
      className: 'title'
    }, ''), React.createElement(AppBar, { 
        title: 'View / Add / Edit Your Events',
        className: 'hamburger',
        isInitiallyOpen: true
      }), React.createElement(EventForm, {
      handleNewEvent: this.addEvent, ref: 'item0', events: this.state.events, all_events: this.state.all_events
    }));
  }
});
