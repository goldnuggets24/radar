@Event = React.createClass
  render: ->  	
    React.DOM.tr null,
      React.DOM.td null, @props.event.date
      React.DOM.td null, @props.event.title
      React.DOM.td null, @props.event.description