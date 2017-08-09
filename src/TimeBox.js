import React from 'react'
import PropTypes from 'prop-types'
import './TimeBox.css'
import CloseLogo from './ic_close.svg'
import SkyGradient from './SkyGradient'
import moment from 'moment'

export default class TimeBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editTimeValue: null}
    this._timeInput = null
  }

  render () {
    return (
      <div className="TimeBox">
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
          <div className="TimeBox-timezone">{this.props.timezoneName}</div>
        </div>
      </div>
    )
  }

  getLocalTime = () => moment.utc(this.props.time).add(this.props.utcOffset, 'hours')

  renderLabelTime = () => <a href="javascript:void(0);" onClick={this.onClickTime}>{this.getLocalTime().format('HH:mm')}</a>

  renderInputTime = () => <input type="text" value={this.state.editTimeValue} onChange={this.onChangeTime}
                                 onBlur={this.onBlurInputTime} onKeyDown={this.onKeyDownInputTime}
                                 ref={c => { this._timeInput = c }} className={this.inputTimeValidationClass()} />

  inputTimeValidationClass = () => moment(this.state.editTimeValue, 'HH:mm', true).isValid() ? '' : 'invalid'

  renderLabelDate = () => <span className="TimeBox-date">{this.getLocalTime().format('MMM Do')}</span>

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
      let inputUtcTime = moment.utc(newValue, 'HH:mm', true).subtract(this.props.utcOffset, 'hours')
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
  timezoneName: PropTypes.string,
  time: PropTypes.object,
  utcOffset: PropTypes.number,
  onClose: PropTypes.func,
  onChangeTime: PropTypes.func
}
