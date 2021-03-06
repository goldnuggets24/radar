React = require('react')
ReactDOM = require('react-dom')
Profile = require('./profile.jsx')
FilterableUserAttributes = require('./filterable_user_attributes')
Navigation = require('../navigation/navigation.jsx')
NewEvent = require('../events/new_event.jsx')
LeftNav = require('material-ui/lib/left-nav')
MenuItem = require('material-ui/lib/menu/menu-item')
AppBar = require('material-ui/lib/app-bar')
SearchInput = require('react-search-input')
List = require('material-ui/lib/lists/list')
ListItem = require('material-ui/lib/lists/list-item')
ListDivider = require('material-ui/lib/lists/list-divider')
Checkbox = require('material-ui/lib/checkbox')
RadioButton = require('material-ui/lib/radio-button')
EventList = require('./event_list.jsx')
injectTapEventPlugin = require("react-tap-event-plugin")
Paper = require('material-ui/lib/paper')
injectTapEventPlugin()

menuItems = [
  { type: MenuItem.Types.SUBHEADER, text: 'New Assignment' },
  { route: 'Stuff', text: 'Projects' },
  { type: MenuItem.Types.SUBHEADER, text: 'Find Workers' },
  { route: 'Stuff', text: 'Groups' },
  { type: MenuItem.Types.SUBHEADER, text: 'Payments' },
  { route: 'Stuff', text: 'Add Funds' },
  { route: 'Stuff', text: 'Accounts' },
  { type: MenuItem.Types.SUBHEADER, text: 'Reports' },
  { route: 'Stuff', text: 'New Report' }
]

PaginatorSection  = require('./paginator_section.js.cjsx')

# ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

UsersSection = React.createClass
  # Display name used for debugging
  displayName: 'UsersSection'

  # Invoked before the component is mounted and provides the initial 
  # state for the render method.
  getInitialState: ->
    # We'll change it to true once we fetch data
    didFetchData: false
    # The users JSON array used to display the cards in the view
    users: []
    attributes: []
    events: []
    selectedEvent: if location.href.indexOf('event=') != -1 then location.search.split('event=')[1].split('&')[0] else ''
    city: if location.href.indexOf('city=') != -1 then location.search.split('city=')[1].split('&')[0].replace(/[^a-zA-Z0-9]/g, ' ') else ''
    initiallyExpanded: false
    profile_toggle: false

    fetchData:
      search: ''
      attr: ''
      page: 1
      per: 20

    meta:
      total_pages: 0
      current_page: 1
      total_count: 0

  componentWillReceiveProps: ->
    @setState
      city: @getQuery().city

  # Invoked right after the component renders
  componentDidMount: ->
    @_fetchUsers({})

  # AJAX call to UsersController
  _fetchUsers: ()->
    $.ajax
      url: '/users'
      dataType: 'json'
      data: @state.fetchData
    .done @_fetchDataDone
    .fail @_fetchDataFail

  # If the AJAX call is successful...
  _fetchDataDone: (data, textStatus, jqXHR) ->
    return false unless @isMounted()
    @setState
      didFetchData: true
      users: data.users
      attributes: data.attributes
      events: data.events
      meta: data.meta

    # If errors in AJAX call...
  _fetchDataFail: (xhr, status, err) =>
    console.error @props.url, status, err.toString()

  _handleOnSearchSubmit: (search) ->
    @state.fetchData=
      search: search

    @_fetchUsers()

  _handleOnFilterSubmit: (search) ->
    @state.fetchData=
      search: search

    @_fetchUsers()

  _handleOnClickFilter: (attr) ->
    @state.fetchData.attr = attr

    @_fetchUsers()

    # PaginatorSection handler
  _handleOnPaginate: (pageNumber) ->
    # Changes  the sate pageNumber value and cal
    @state.fetchData.page = pageNumber
    # Retrieve new results page
    @_fetchUsers()

  _handleClick: (e) ->
    e.preventDefault()
    @refs.leftNav.toggle()

  _handleTouchTap: (e) ->
    e.preventDefault

  searchUpdated: (term) ->
    @state.fetchData.per = 90
    @setState 
      searchTerm: term

    @_fetchUsers()

  _handleOnEventSelection: (e) ->
    @_fetchUsers()
    debugger
    @setState
      selectedEvent: e

  _handleOnCheckedEvent: (e) ->
    @_fetchUsers()

  _handleOnCheckedProfileExpander: (e) -> 
    if $('input').is(':checked')
      @setState 
        initiallyExpanded: true
    else
      @setState 
        initiallyExpanded: false

  _handleToggleCondensedUserList: (e, bool) ->
    @state.fetchData.per = e
    @setState 
      profile_toggle: bool

    @_fetchUsers()

  render: ->
    all_users = @state.users
    all_events = @state.events

    searchInputStyle =
      float: 'left'
      width: '100px'
      border: '1px solid black'

    if @refs.search
      filters = [
        'city'
        'state'
        'first_name'
      ]
      @state.users = @state.users.filter(@refs.search.filter(filters))

    <div className="cards-wrapper col-md-12">
      <AppBar title='Find and Add Promotional Staff to Your Events' className='hamburger' onLeftIconButtonTouchTap={@_handleClick} isInitiallyOpen={true}/>
      <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />

      <EventList selectedEvent={@state.selectedEvent} onEventSelection={@_handleOnEventSelection} events={all_events} key=1 />

      <PaginatorSection key={18908} totalPages={@state.meta.total_pages} currentPage={@state.meta.current_page} onPaginate={@_handleOnPaginate}/>
      <div className="col-md-2">

        <Paper zDepth={1} className="paper">
          <Checkbox className='toggle-users' key={1000} onCheck={@_handleOnCheckedProfileExpander} />
          <h3 className='toggle-users-title'>Toggle User Profiles</h3>
        </Paper>

        <Paper zDepth={1} className="paper">
          <h4 className="search-text">Search by City:</h4>
          <SearchInput value={@state.city} className='search-input' style={searchInputStyle} ref='search' onChange={this.searchUpdated} />
        </Paper>

        <Paper zDepth={1} className="paper">
          <FilterableUserAttributes onFilterLinkClick={@_handleOnClickFilter} />
        </Paper>
      </div>
      <div className="col-md-10">
        <Profile key={1} profile_toggle={@state.profile_toggle} initiallyExpanded={@state.initiallyExpanded} onToggle={@_handleToggleCondensedUserList} onCheckedEvent={@_handleOnCheckedEvent} selectedEvent={@state.selectedEvent} events={all_events} users={@state.users} />
      </div>
    </div>

Staff = if $('#staff').length > 0 then ReactDOM.render(<UsersSection />, document.getElementById('staff')) else ''
ReactDOM.render(<Navigation />, document.getElementById('nav'))
CreateEvent = if $('#create-event').length > 0 then ReactDOM.render(<NewEvent />, document.getElementById('create-event')) else ''