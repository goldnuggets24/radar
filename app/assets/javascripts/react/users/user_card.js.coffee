# @cjsx React.DOM

@UserCard = React.createClass
  displayName: 'UserCard'
  render: ->
    # let's use this add-on to set the main div's class names
    cx = React.addons.classSet
    cardClasses = cx
      'card': true
      'Mike': @props.data.name == 'Mike'

    # here we use the calculated classes
    <div className={cardClasses}>
      <header>
        <div className="avatar-wrapper">
          &nbsp;

        </div>
        <div className="info-wrapper">
          <h4>{@props.data.name} {@props.data.name}</h4>
          <ul className="meta">
            <li>
              <i className="fa fa-map-marker"></i> {@props.data.name}
            </li>
            <li>
              <i className="fa fa-birthday-cake"></i> {@props.data.name}
            </li>
          </ul>
        </div>
      </header>
      <div className="card-body">
        <div className="headline">
          <p>{@props.data.name}</p>
        </div>
        <ul className="contact-info">
          <li><i className="fa fa-phone"></i> {@props.data.name}</li>
          <li><i className="fa fa-envelope"></i> {@props.data.email}</li>
        </ul>
      </div>
    </div>