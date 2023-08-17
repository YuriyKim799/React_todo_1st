import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onHandleChange = (e) => {
    if (e.target.name === 'minutes' || e.target.name === 'seconds') {
      const a = Number(e.target.value)
      if (Number.isNaN(a) || Number.isNaN(a)) {
        // eslint-disable-next-line no-alert
        alert('введите число')
        return
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onTimeCreated = () => {
    const y = new Date().getFullYear()
    const mon = new Date().getMonth()
    const d = new Date().getDate()
    const h = new Date().getHours()
    const m = new Date().getMinutes()
    const s = new Date().getSeconds()
    const time = [y, mon, d, h, m, s]
    return time
  }

  clearField = () => {
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    const time = this.onTimeCreated()
    this.props.onItemAdded(label, time, minutes, seconds)
    this.clearField()
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          name="label"
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          onChange={this.onHandleChange}
        />
        <input
          name="minutes"
          className="new-todo-form__timer"
          value={minutes}
          placeholder="Min"
          onChange={this.onHandleChange}
        />
        <input
          name="seconds"
          className="new-todo-form__timer"
          value={seconds}
          placeholder="Sec"
          onChange={this.onHandleChange}
        />
        <input type="submit" hidden />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}
