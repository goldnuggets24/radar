React = require('react')
ReactDOM = require('react-dom')

FilterLink = React.createClass
  displayName: 'filterLink'
  # Click handler will use it's onFilterLinkClick prop to pass 
  # value to it's parent.

  _handleOnClick: (i) ->
    @props.onFilterLinkClick(i)
    $('.filter_buttons a').css("color", "blue")
    $('.'+i).css("color", "red")

  render: ->
    cx = React.addons.classSet
    cardClasses = cx
      'card': true

    users = all_users

    if @refs.search
      filters = [
        'role',
        'name',
        'sex'
      ]
      users = users.filter(@refs.search.filter(filters))

    React.createElement 'div', null, React.createElement(SearchInput,
      ref: 'search'
      onChange: @searchUpdated), users.map((user) ->
        <div className={cardClasses}>
          <header>
            <div className="avatar-wrapper">
              &nbsp;
            </div>
            <div className="info-wrapper">
              <h4>{user.name}</h4>
              <ul className="meta">
                <li>
              
                </li>
              </ul>
            </div>
          </header>
          <div className="card-body">
            <div className="headline">
              <p>{user.name}</p>
            </div>
            <ul className="contact-info">
              <li><i className="fa fa-phone"></i> {user.name}</li>
              <li><i className="fa fa-envelope"></i> {user.email}</li>
            </ul>
          </div>
        </div>
    )

  searchUpdated: (term) ->
    @setState searchTerm: term
    return