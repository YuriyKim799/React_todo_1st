import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskFilter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  }

  buttons = [
    { name: 'all', textContent: 'All' },
    { name: 'done', textContent: 'Done' },
    { name: 'active', textContent: 'Active' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const btnEls = this.buttons.map((item) => {
      const isActive = filter === item.name
      const clazz = isActive ? 'selected' : ''
      return (
        <li key={item.name}>
          <button type="submit" className={clazz} onClick={() => onFilterChange(item.name)}>
            {' '}
            {item.textContent}{' '}
          </button>
        </li>
      )
    })

    return <ul className="filters">{btnEls}</ul>
  }
}
