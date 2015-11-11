'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var ContextPure = require('material-ui/lib/mixins/context-pure');
var StylePropable = require('material-ui/lib/mixins/style-propable');
var WindowListenable = require('material-ui/lib/mixins/window-listenable');
var CssEvent = require('material-ui/lib/utils/css-event');
var KeyCode = require('material-ui/lib/utils/key-code');
var Calendar = require('./calendar');
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');
var DefaultRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var ThemeManager = require('material-ui/lib/styles/theme-manager');

var DatePickerDialog = React.createClass({
  displayName: 'DatePickerDialog',

  mixins: [StylePropable, WindowListenable, ContextPure],

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      return {
        buttonColor: muiTheme.datePicker.calendarTextColor
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [Calendar, Dialog];
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp'
  },

  getInitialState: function getInitialState() {
    return {
      isCalendarActive: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var initialDate = _props.initialDate;
    var onAccept = _props.onAccept;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['initialDate', 'onAccept', 'style']);

    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var calendarTextColor = _constructor$getRelevantContextKeys.calendarTextColor;

    var styles = {
      root: {
        fontSize: 14,
        color: calendarTextColor
      },

      dialogContent: {
        width: this.props.mode === 'landscape' ? 480 : 320
      },

      dialogBodyContent: {
        padding: 0
      },

      actions: {
        marginRight: 8
      },

      color: {
        color: '#000'
      }
    };

    var actions = [ React.createElement(
      'div',
      { style: styles.color },
      'Event Info'
    ), React.createElement(FlatButton, {
      key: 0,
      label: 'Cancel',
      secondary: true,
      style: styles.actions,
      onTouchTap: this._handleCancelTouchTap })];

    if (!this.props.autoOk) {
      actions.push(React.createElement(FlatButton, {
        key: 1,
        label: 'OK',
        secondary: true,
        disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
        style: styles.actions,
        onTouchTap: this._handleOKTouchTap }));
    }

    return React.createElement(
      Dialog,
      _extends({}, other, {
        ref: 'dialog',
        style: styles.root,
        contentStyle: styles.dialogContent,
        bodyStyle: styles.dialogBodyContent,
        actions: actions,
        onDismiss: this._handleDialogDismiss,
        onShow: this._handleDialogShow,
        onClickAway: this._handleDialogClickAway,
        repositionOnUpdate: false }),
      React.createElement(Calendar, {
        ref: 'calendar',
        events: this.props.events,
        onDayTouchTap: this._onDayTouchTap,
        initialDate: this.props.initialDate,
        isActive: this.state.isCalendarActive,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        shouldDisableDate: this.props.shouldDisableDate,
        showYearSelector: this.props.showYearSelector,
        mode: this.props.mode })
    );
  },

  show: function show() {
    this.refs.dialog.show();
  },

  dismiss: function dismiss() {
    this.refs.dialog.dismiss();
  },

  _onDayTouchTap: function _onDayTouchTap() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap, 300);
    }
  },

  _handleCancelTouchTap: function _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap: function _handleOKTouchTap() {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  },

  _handleDialogShow: function _handleDialogShow() {
    this.setState({
      isCalendarActive: true
    });

    if (this.props.onShow) this.props.onShow();
  },

  _handleDialogDismiss: function _handleDialogDismiss() {
    var _this = this;

    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this.refs.dialog), function () {
      _this.setState({
        isCalendarActive: false
      });
    });

    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleDialogClickAway: function _handleDialogClickAway() {
    var _this2 = this;

    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this.refs.dialog), function () {
      _this2.setState({
        isCalendarActive: false
      });
    });

    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (this.state.isCalendarActive) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;