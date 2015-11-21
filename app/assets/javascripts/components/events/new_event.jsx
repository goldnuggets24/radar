var React = require('react');
var ReactDOM = require('react-dom');
var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
var TimePicker = require('material-ui/lib/time-picker');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      title: '',
      description: '',
      address: '',
      city: ''
    };
  },
  valid: function() {
    return this.state.title;
  },
  handleChange: function(e) {
    var name, obj;
    name = e.target.name;
    return this.setState((
      obj = {},
      obj["" + name] = e.target.value,
      obj
    ));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return $.post('/events', {
      event: this.state,
      start_date: $('#mui-id-2').val(),
      end_date: $('#mui-id-3').val(),
      start_time: $('#mui-id-4').val(),
      end_time: $('#mui-id-5').val(),
      address: $('#mui-id-6').val(),
      city: $('#mui-id-7').val()
    }, (function(_this) {
    	location.href = '/events/route_to_home'
    }) (this), 'JSON');
  },

  render: function() {

        return (
        	<div className="create-event-form">

        	<form
		      className='form-inline'
		      onSubmit={this.handleSubmit}>

		        <TextField
		          	type='text'
					hintText='Title'
					name='title'
					value={this.state.title}
					onChange={this.handleChange}
				/>

				 <TextField
		          	type='text'
					hintText='Description'
					name='description'
					value={this.state.description}
					onChange={this.handleChange}
				/>

				<DatePicker
					name='start_date'
					hintText="Start Date"
					mode="portrait" />

				<DatePicker
					name='end_date'
					hintText="End Date"
					mode="portrait" />

				<TimePicker
					name='start_time'
					hintText="Start Time"
					mode="portrait" />

				<TimePicker
					name='end_time'
					hintText="End Time"
					mode="portrait" />
				
				<TextField
		          	type='text'
					hintText='Address'
					name='address'
					value={this.state.address}
					onChange={this.handleChange}
				/>

				<TextField
		          	type='text'
					hintText='City'
					name='city'
					value={this.state.city}
					onChange={this.handleChange}
				/>

				 <FlatButton
			        type='submit'
			        className='btn btn-primary create-event'
			        disabled={!this.valid()}
			        label='Create event' />

				

			</form>

			</div>
        );
    }
});
