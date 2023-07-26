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
  }

  onLabelChange = (event) => {
    this.setState({
      textValue: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.editItem(this.props.id, this.state.textValue, this.props.edit)
    this.setState({
      textValue: '',
    })
  }

  render() {
    const { description, onDeleted, onEdited, id, onToggleDone, done, edit, timeOfCreate } = this.props
    let classNames = ''
    let mark = false

    if (done) {
      classNames = 'completed'
      mark = true
    }
    if (edit) {
      classNames = 'editing'
    }

    const result = formatDistanceToNow(new Date(...timeOfCreate), {
      includeSeconds: true,
    })

    const { textValue } = this.state

    return (
      <li className={classNames} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={mark} onClick={onToggleDone} />
          <label className="label-wrap">
            <span className="description" onClick={onToggleDone} role="button" tabIndex={0} onKeyDown={onToggleDone}>
              {description}
            </span>
            <span className="created">created {result} ago</span>
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
