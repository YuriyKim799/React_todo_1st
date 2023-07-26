import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
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
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const time = this.onTimeCreated()
    this.props.onItemAdded(this.state.label, time)
    this.clearField()
  }

  render() {
    const { label } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={label} onChange={this.onLabelChange} />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}
