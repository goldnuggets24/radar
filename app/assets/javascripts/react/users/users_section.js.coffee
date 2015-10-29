React = require('react')
ReactDOM = require('react-dom')
Profile = require('./profile.jsx')
FilterableUserAttributes = require('./filterable_user_attributes')
Navigation = require('./navigation.jsx')
PaginatorSection  = require('./paginator_section.js.cjsx');

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
      url: Routes.users_path()
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

  render: ->
    cardsNode = @state.users.map (user) ->
      <Profile key={user.id} email={user.email} bio={user.bio} name={user.name}/>

    <div className="cards-wrapper col-md-12">
      <FilterableUserAttributes onFilterLinkClick={@_handleOnClickFilter} />
      <div className="col-md-10">
        <PaginatorSection totalPages={@state.meta.total_pages} currentPage={@state.meta.current_page} onPaginate={@_handleOnPaginate}/>
        {cardsNode}
        <PaginatorSection totalPages={@state.meta.total_pages} currentPage={@state.meta.current_page} onPaginate={@_handleOnPaginate}/>
      </div>
    </div>

container = document.getElementById('staff');

Peter = if $('#staff').length > 0 then ReactDOM.render(<UsersSection />, container) else ''
ReactDOM.render(<Navigation />, document.getElementById('nav'))