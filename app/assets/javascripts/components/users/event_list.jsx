var React = require('react');
var ReactDOM = require('react-dom');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Checkbox = require('material-ui/lib/checkbox');
var ListDivider = require('material-ui/lib/lists/list-divider');
var ReactIntl = require('react-intl/lib/react-intl');
var RadioButton = require('material-ui/lib/radio-button');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableFooter = require('material-ui/lib/table/table-footer');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;

module.exports = React.createClass({
	displayName: 'EventList',
	mixins: [IntlMixin],

	_handleCheckBoxOnCheck: function(event) {
		var eventselection = '';
		debugger;
		for (var i=0; i < this.props.events.length; i++) {eventselection = event.length == 0 ? '' : this.props.events[event.toString()].id}
		this.props.onEventSelection(eventselection);
	},

	render: function() {
		// table options
		this.state = {
			fixedHeader: true,
			stripedRows: true,
			showRowHover: false,
			selectable: true,
			multiSelectable: false,
			enableSelectAll: false,
			deselectOnClickaway: true,
			height: '90px',
    	};

		var rows = [];
		for (var i=0; i < this.props.events.length; i++) {
		    rows.push(
			      <TableRow 
			      	selected={this.props.selectedEvent == this.props.events[i].id ? true : false}
			      >
			        <TableRowColumn>
			          	<p>
				           <FormattedDate
								value={new Date(this.props.events[i].date.substring(0,4), Number(this.props.events[i].date.substring(5,7)) - 1, this.props.events[i].date.substring(8,10))}
								day="numeric"
								month="long"
								year="numeric" />
				            </p>
					</TableRowColumn>
			          <TableRowColumn>{this.props.events[i].title}</TableRowColumn>
			          <TableRowColumn>{this.props.events[i].description}</TableRowColumn>
			          <TableRowColumn>{this.props.events[i].city}</TableRowColumn>
			        </TableRow>
		    );
		}
		return <div className="events-section">
			<Table
				height={this.state.height}
				fixedHeader={this.state.fixedHeader}
				selectable={this.state.selectable}
				multiSelectable={this.state.multiSelectable}
				onRowSelection={this._handleCheckBoxOnCheck}>
			      <TableHeader key={this.state.enableSelectAll} enableSelectAll={this.state.enableSelectAll}>
			        <TableRow>
			          <TableHeaderColumn tooltip='Date'>Date</TableHeaderColumn>
			          <TableHeaderColumn tooltip='Title'>Title</TableHeaderColumn>
			          <TableHeaderColumn tooltip='Description'>Description</TableHeaderColumn>
			          <TableHeaderColumn tooltip='City'>City </TableHeaderColumn>
			        </TableRow>
			      </TableHeader>
			    <TableBody
			        deselectOnClickaway={this.state.deselectOnClickaway}
			        showRowHover={this.state.showRowHover}
			        stripedRows={this.state.stripedRows}>
			        	{rows}
				</TableBody>
	      		</Table>
			</div>;
	}
});

