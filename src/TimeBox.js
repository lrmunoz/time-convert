import React from 'react'
import PropTypes from 'prop-types'
import './TimeBox.css'
import CloseLogo from './ic_close.svg'
import SkyGradient from './SkyGradient'
import moment from 'moment-timezone'
import _ from 'lodash'

export default class TimeBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editTimeValue: null}
    this._timeInput = null
  }

  render () {
    return (
      <div className={_(['TimeBox', this.props.highlight && 'TimeBox_highlight']).compact().join(' ')}>
        <SkyGradient className="TimeBox-daylight" hourOfDay={this.getLocalTime().get('hour')} />
        <div className="TimeBox-content">
          <div className="TimeBox-header" >
            <span className="Timebox-header-place">{this.props.placeName}</span>
            <a href="javascript:void(0);" className="TimeBox-close" onClick={this.props.onClose}>
              <svg>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={CloseLogo + '#close'}></use>
              </svg>
            </a>
          </div>
          <div className="TimeBox-datetime">
            <div className="TimeBox-time">
              {this.state.editTimeValue !== null ? this.renderInputTime() : this.renderLabelTime()}
            </div>
            <div>
              {this.state.editTimeValue !== null ? <span>&nbsp;</span> : this.renderLabelDate()}
            </div>
          </div>
          <div className="TimeBox-timezone">
            <span>{this.getLocalTime().zoneAbbr()}</span>
            {this.getOffsetWithReference() ? <span className="TimeBox-timezone-offset"> ({this.getOffsetWithReference() > 0 ? '+' : ''}{this.getOffsetWithReference()} hours)</span> : ''}
          </div>
        </div>
      </div>
    )
  }

  getLocalTime = () => moment.tz(this.props.time, this.props.ianaTimezone)

  getReferenceTime = () => moment.tz(this.props.time, this.props.referenceIanaTimezone)

  getOffsetWithReference = () => {
    if (!this.props.referenceIanaTimezone) return null
    return Number((this.getLocalTime().utcOffset() - this.getReferenceTime().utcOffset()) / 60)
  }

  renderLabelTime = () => <a href="javascript:void(0);" onClick={this.onClickTime}>{this.getLocalTime().format('HH:mm')}</a>

  renderInputTime = () => <input type="text" value={this.state.editTimeValue} onChange={this.onChangeTime}
                                 onBlur={this.onBlurInputTime} onKeyDown={this.onKeyDownInputTime}
                                 ref={c => { this._timeInput = c }} className={this.inputTimeValidationClass()} />

  inputTimeValidationClass = () => moment(this.state.editTimeValue, 'HH:mm', true).isValid() ? '' : 'invalid'

  renderLabelDate = () => this.props.highlight ? <span>&nbsp;</span> : <span className="TimeBox-date">{this.getLocalTime().format('MMM Do')}</span>

  onClickTime = () => {
    this.setState({editTimeValue: this.getLocalTime().format('HH:mm')})
  }

  onChangeTime = (e) => {
    this.setState({editTimeValue: e.target.value})
  }

  onBlurInputTime = () => {
    this.setState({editTimeValue: null})
  }

  onKeyDownInputTime = (e) => {
    if (e.key === 'Escape') this.setState({editTimeValue: null})
    if (e.key === 'Enter') {
      let newValue = e.target.value
      let inputUtcTime = moment.tz(newValue, 'HH:mm', this.props.ianaTimezone)
      this.setState({editTimeValue: null}, () => {
        if (inputUtcTime.isValid()) {
          if (this.props.onChangeTime) this.props.onChangeTime(inputUtcTime)
        }
      })
    }
  }

  componentDidUpdate () {
    if (this._timeInput) this._timeInput.focus()
  }
}

TimeBox.propTypes = {
  placeName: PropTypes.string,
  ianaTimezone: PropTypes.string,
  referenceIanaTimezone: PropTypes.string,
  time: PropTypes.object,
  highlight: PropTypes.bool,
  onClose: PropTypes.func,
  onChangeTime: PropTypes.func
}
