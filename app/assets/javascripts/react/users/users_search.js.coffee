# @cjsx React.DOM

@UsersSearch = React.createClass
  displayName: 'UsersSearch'

  # Submit handler
  _handleOnSubmit: (e) ->
    e.preventDefault()
    searchValue = @refs.search.getDOMNode().value.trim()
    @props.onFormSubmit(searchValue)

  render: ->
    <div className="filter-wrapper">
      <div className="form-wrapper">
        <form onSubmit={@_handleOnSubmit}>
          <input ref="search" placeholder="Search users..." type="search"/>
        </form>
      </div>
    </div>