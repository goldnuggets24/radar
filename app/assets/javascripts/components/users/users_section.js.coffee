React = require('react')
ReactDOM = require('react-dom')
Profile = require('./profile.jsx')
FilterableUserAttributes = require('./filterable_user_attributes')
Navigation = require('../navigation/navigation.jsx')
LeftNav = require('material-ui/lib/left-nav')
MenuItem = require('material-ui/lib/menu/menu-item')
AppBar = require('material-ui/lib/app-bar')
SearchInput = require('react-search-input')
injectTapEventPlugin = require("react-tap-event-plugin")
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

    fetchData:
      search: ''
      attr: ''
      page: 1

    meta:
      total_pages: 0
      current_page: 1
      total_count: 0

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
    @_fetchUsers()
    @setState searchTerm: term

  render: ->

    all_events = @state.events

    searchInputStyle =
      float: 'left'
      width: '100px'
      border: '1px solid black'

    if @refs.search
      filters = [
        'city'
        'state'
        'sex'
        'first_name'
      ]
      @state.users = @state.users.filter(@refs.search.filter(filters))

    cardsNode = @state.users.map (user) ->
      <Profile key={user.id} events={all_events} city={user.city} email={user.email} bio={user.bio} first_name={user.first_name} last_name={user.last_name} name={user.name}/>

    <div className="cards-wrapper col-md-12">
      <AppBar title='Find and Add Promotional Staff to Your Events' className='hamburger' onLeftIconButtonTouchTap={@_handleClick} isInitiallyOpen={true}/>
      <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
      <PaginatorSection totalPages={@state.meta.total_pages} currentPage={@state.meta.current_page} onPaginate={@_handleOnPaginate}/>
      <div className="col-md-2">
        <FilterableUserAttributes onFilterLinkClick={@_handleOnClickFilter} />
        <h4 className="search-text">Search by City:</h4>
        <SearchInput className='search-input' style={searchInputStyle} ref='search' onChange={this.searchUpdated} />
      </div>
      <div className="col-md-10">
        {cardsNode}
      </div>
    </div>
debugger
Staff = if $('#staff').length > 0 then ReactDOM.render(<UsersSection />, document.getElementById('staff')) else ''
ReactDOM.render(<Navigation />, document.getElementById('nav'))