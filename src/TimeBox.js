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
        <SkyGradient className="TimeBox-daylight" hourOfDay={this.props.time.get('hour')} />
        <div className="TimeBox-content">
          <div className="TimeBox-header" >
            <span>{this.props.placeName}</span>
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
              {this.state.editTimeValue !== null ? this.renderInputTimeValidation() : this.renderLabelDate()}
            </div>
          </div>
          <div className="TimeBox-timezone">{this.props.timezone}</div>
        </div>
      </div>
    )
  }

  renderLabelTime = () => <a href="javascript:void(0);" onClick={this.onClickTime}>{this.props.time.format('HH:mm')}</a>

  renderInputTime = () => <input type="text" value={this.state.editTimeValue} onChange={this.onChangeTime}
                                 onBlur={this.onBlurInputTime} onKeyDown={this.onKeyDownInputTime} ref={c => { this._timeInput = c }}/>

  renderInputTimeValidation = () => moment(this.state.editTimeValue, 'HH:mm', true).isValid() ? <span>&nbsp;</span> : <span className="TimeBox-time_error" >Invalid time</span>

  renderLabelDate = () => <span className="TimeBox-date">{this.props.time.format('MMM Do')}</span>

  onClickTime = () => {
    this.setState({editTimeValue: this.props.time.format('HH:mm')})
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
      let inputTime = moment(newValue, 'HH:mm', true)
      this.setState({editTimeValue: null}, () => {
        if (inputTime.isValid()) {
          if (this.props.onChangeTime) this.props.onChangeTime(inputTime)
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
  timezone: PropTypes.string,
  time: PropTypes.object,
  onClose: PropTypes.func,
  onChangeTime: PropTypes.func
}
