import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from './task-filter'

function Footer({ doneCount, filter, onFilterChange, onDeleteCompleted }) {
  Footer.propTypes = {
    doneCount: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    onDeleteCompleted: PropTypes.func,
  }

  return (
    <div className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="submit" className="clear-completed" onClick={() => onDeleteCompleted()}>
        Clear completed
      </button>
    </div>
  )
}

Footer.defaultProps = {
  doneCount: 'count is not available',
  filter: () => 'filter',
  onFilterChange: () => 'onFilterChange',
  onDeleteCompleted: () => 'onDeleteCompleted',
}

export default Footer
