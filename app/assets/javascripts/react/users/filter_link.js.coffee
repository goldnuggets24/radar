# /app/assets/javascripts/react/paginator/paginator_link.js.coffee

# @cjsx React.DOM

@FilterLink = React.createClass
  displayName: 'filterLink'
  # Click handler will use it's onFilterLinkClick prop to pass 
  # value to it's parent.
  _handleOnClick: (i) ->
    @props.onFilterLinkClick(i)


  render: ->
    <div className="too">
      <a className="cosby" href="#" onClick={@_handleOnClick.bind this, @props.data[0]}>{@props.data[0]}</a>
      <a className="cosby" href="#" onClick={@_handleOnClick.bind this, @props.data[1]}>{@props.data[1]}</a>
    </div>