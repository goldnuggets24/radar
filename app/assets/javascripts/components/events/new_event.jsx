var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
var TimePicker = require('material-ui/lib/time-picker');
var AutoComplete = require('material-ui/lib/auto-complete');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

module.exports = React.createClass({
	displayName: 'NewEvent',

	getInitialState: function() {
	    return {
			title: '',
			description: '',
			address: '',
			startDate: location.href.indexOf('date=') != -1 ? new Date(location.search.split('date=')[1].split('&')[0].replace(/[^a-zA-Z0-9]/g, ',')) : {}
	    };
	  },

  	componentDidMount: function() {
		return this._fetchCities({});
  	},

	_fetchCities: function() {
    	return $.ajax({
			url: '/events/new',
			dataType: 'json',
			data: this.state.fetchData
		}).done(this._fetchDataDone).fail(this._fetchDataFail);
	},

  	_fetchDataDone: function(data, textStatus, jqXHR) {
    	if (!this.isMounted()) {
			return false;
		}
		return this.setState({
			didFetchData: true,
			region: data.cities
    	});
  	},
	_fetchDataFail: (function(_this) {
    	return function(xhr, status, err) {
      		return console.error(_this.props.url, status, err.toString());
    	};
	})(this),

  valid: function() {
    return this.state.title;
  },
  _handleChange: function(e) {
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
      region: $('#mui-id-4').val(),
      start_date: $('#mui-id-5').val(),
      end_date: $('#mui-id-6').val(),
      start_time: $('#mui-id-7').val(),
      end_time: $('#mui-id-8').val()
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
					onChange={this._handleChange}
				/>

				<TextField
		          	type='text'
					hintText='Location'
					name='location'
					value={this.state.location}
					onChange={this._handleChange}
				/>

				<TextField
		          	type='text'
					hintText='Notes'
					name='description'
					className='text-field-long'
					value={this.state.description}
					onChange={this._handleChange}
				/>
				
				<TextField
		          	type='text'
					hintText='Address'
					name='address'
					value={this.state.address}
					onChange={this._handleChange}
				/>

				<AutoComplete
					fullWidth={true}
					floatingLabelText = 'Choose Region'
					showAllItems = {false}
					animated = {true}
					name='region'
					value={this.state.region}
					onChange={this._handleChange}
					dataSource = {this.state.region} />

				<h3 className="tracking-header">Dates &amp; Times</h3>

				<DatePicker
					name='start_date'
					className='pull-left'
					hintText="Start Date"
					value={this.state.startDate}
					mode="portrait" />

				<DatePicker
					name='end_date'
					className='pull-left'
					hintText="End Date"
					mode="portrait" />

				<TimePicker
					name='start_time'
					className='pull-left start-time'
					hintText="Start Time"
					onChange={this._handleChange}
					mode="portrait" />

				<TimePicker
					name='end_time'
					hintText="End Time"
					onChange={this._handleChange}
					mode="portrait" />

				<h3 className="tracking-header">Tracking</h3>

				<TextField
		          	type='text'
					hintText='Manager'
					name='manager'
					className='pull-left'
					value={this.state.project_manager}
					onChange={this._handleChange}
				/>

				<TextField
		          	type='text'
		          	className='pull-left'
					hintText='Client'
					name='client'
					value={this.state.client}
					onChange={this._handleChange}
				/>

				<div className="clearfix">&nbsp;</div>

				 <FlatButton
			        type='submit'
			        className='btn pull-left clearfix btn-primary create-event'
			        disabled={!this.valid()}
			        label='Create event' />

				

			</form>

			</div>
        );
    }
});
