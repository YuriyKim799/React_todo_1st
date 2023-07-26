import React from 'react'
import PropTypes from 'prop-types'

import Task from './task'

function TaskList({ taskData, onDeleted, onToggleDone, onEdited, editItem }) {
  TaskList.propTypes = {
    taskData: PropTypes.array.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
  }

  const elements = taskData.map((item) => (
    <Task
      id={item.id}
      description={item.description}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onEdited={() => onEdited(item.id)}
      editItem={editItem}
      done={item.done}
      edit={item.edit}
      timeOfCreate={item.timeOfCreate}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
