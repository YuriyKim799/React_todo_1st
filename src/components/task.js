/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static propTypes = {
    description: PropTypes.string,
    editItem: PropTypes.func.isRequired,
    id: PropTypes.number,
    edit: PropTypes.bool,
    onDeleted: PropTypes.func,
    onEdited: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool,
    timeOfCreate: PropTypes.array,
  }

  state = {
    textValue: this.props.description,
    timer: this.props.timer,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    showTimeSpan: true,
    showTimesGone: true,
    timerSwitch: false,
  }

  componentDidMount() {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      this.setState({
        timerSwitch: true,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.minutes !== prevState.minutes || this.state.seconds !== prevState.seconds) {
      if (this.state.seconds === 0 && this.state.minutes === 0) {
        clearInterval(this.state.timer)
        this.onDidUpdate()
      }
    }
  }

  componentWillUnmount() {
    localStorage.setItem(
      this.props.id,
      JSON.stringify({
        minutes: this.state.minutes,
        seconds: this.state.seconds,
      })
    )
  }

  onDidUpdate = () => {
    this.setState({
      showTimeSpan: false,
      showTimesGone: false,
    })
  }

  onStartMinus = () => {
    clearInterval(this.state.timer)
    this.state.timer = setInterval(() => {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }))
      if (this.state.seconds === 0) {
        this.setState(({ minutes }) => ({
          seconds: 59,
          minutes: minutes - 1,
        }))
      }
    }, 1000)
  }

  onStartPlus = () => {
    clearInterval(this.state.timer)
    this.state.timer = setInterval(() => {
      this.setState(({ seconds }) => ({
        seconds: seconds + 1,
      }))
      if (this.state.seconds === 59) {
        this.setState(({ minutes }) => ({
          seconds: 0,
          minutes: minutes + 1,
        }))
      }
    }, 1000)
  }

  onPause = () => {
    clearInterval(this.state.timer)
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.editItem(this.props.id, this.state.textValue, this.props.edit)
    this.setState({
      textValue: '',
    })
  }

  onLabelChange = (event) => {
    this.setState({
      textValue: event.target.value,
    })
  }

  render() {
    const { description, onDeleted, onEdited, id, onToggleDone, done, edit, timeOfCreate } = this.props

    const { textValue, minutes, seconds, timer, showTimeSpan, showTimesGone, timerSwitch } = this.state
    let classNames = ''
    let mark = false

    if (done) {
      classNames = 'completed'
      mark = true
      clearInterval(timer)
    }

    if (edit) {
      classNames = 'editing'
    }

    const result = formatDistanceToNow(new Date(...timeOfCreate), {
      includeSeconds: true,
    })

    return (
      <li className={classNames} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={mark} onClick={onToggleDone} />

          <label htmlFor="title">
            <span className="title" onClick={onToggleDone} role="button" tabIndex={0} onKeyDown={onToggleDone}>
              {description}
            </span>

            <span className={showTimeSpan ? 'description' : 'description-hidden'}>
              <button
                className="icon icon-play"
                type="button"
                aria-label="play"
                onClick={timerSwitch ? this.onStartPlus : this.onStartMinus}
              />
              <button className="icon icon-pause" type="button" aria-label="pause" onClick={this.onPause} />
              <span className="time-span">
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </span>
            <span className={showTimesGone ? 'hidden' : 'show'}>ВРЕМЯ ВЫШЛО</span>
            <span className="description">created {result} ago</span>
          </label>

          <button aria-label="edit" type="button" className="icon icon-edit" onClick={onEdited} />
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>

        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onLabelChange} value={textValue} />
        </form>
      </li>
    )
  }
}

Task.defaultProps = {
  description: '',
  onDeleted: () => 'object',
  onEdited: () => 'onEdited',
  id: 100,
  onToggleDone: () => 'onToggleDone',
  done: false,
  edit: '',
  timeOfCreate: [2023, 6, 5, 22, 58, 25],
}
