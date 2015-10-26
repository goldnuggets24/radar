ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

@UsersSection = React.createClass
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

  render: ->
    cardsNode = @state.users.map (user) ->
      <UserCard key={user.id} data={user}/>

    noDataNode =
      <div className="warning">
        <span className="fa-stack">
          <i className="fa fa-meh-o fa-stack-2x"></i>
        </span>
        <h4>No people found...</h4>
      </div>
    <div>
      <FilterableUserAttributes onFilterLinkClick={@_handleOnClickFilter} href="#"/>

      <div className="cards-wrapper">

        {
          window.all_users = @state.users
          # If there are people render the cards...
          if @state.users.length > 0
            <ReactCSSTransitionGroup transitionName="card">
              <FilterLink onFilterLinkClick={@_handleOnClickFilter} data={@state.users}/>
            </ReactCSSTransitionGroup>
          else if @state.didFetchData
            {noDataNode}
        }
      </div>
    </div>