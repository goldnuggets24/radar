# @cjsx React.DOM

@FilterableUserAttributes = React.createClass
	# Display name used for debugging
	displayName: 'FilterableUserAttributes'

	_handleOnClick: (i) ->
		@props.onFilterLinkClick(i)
		$('.filter_buttons a').css("color", "blue")
		$('.'+i).css("color", "red")

	render: ->
		<div className="filter-buttons">
			<h3>Filterable Categories</h3>
			<a onClick={@_handleOnClick.bind this, "admin"} href="#">Admin</a>
			<br />
			<a onClick={@_handleOnClick.bind this, "user"} href="#">User</a>
		</div>