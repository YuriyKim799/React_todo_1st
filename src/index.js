/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import TaskList from './components/task-list'
import AppHeader from './components/app-header'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'
import './index.css'

export default class App extends Component {
  maxId = 1

  timer = 1

  state = {
    todoData: [],
    filter: 'all', // All, Done, Active
  }

  // onStart = () => {
  //   clearInterval(this.state.timer)
  //   this.timer = setInterval(() => {
  //     this.setState(({ seconds }) => ({
  //       seconds: seconds + 1,
  //     }))
  //     if (this.state.seconds === 59) {
  //       this.setState(({ minutes }) => ({
  //         seconds: 0,
  //         minutes: minutes + 1,
  //       }))
  //     }
  //   }, 1000)
  // }

  // onPause = () => {
  //   clearInterval(this.state.timer)
  // }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  addItem = (text, time, minutes, seconds) => {
    const min = Number(minutes)
    const sec = Number(seconds)
    if (text === '') {
      return
    }
    if (min > 59 || sec > 59) {
      // eslint-disable-next-line no-alert
      alert('вы ввели некорректное время')
      return
    }

    this.setState(({ todoData }) => {
      const newArr = [...todoData, this.createTodoItem(text, time, minutes, seconds)]
      return {
        todoData: newArr,
      }
    })
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        description: text,
        edit: false,
      }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({
      filter,
    })
  }

  onDeleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.done)
      return {
        todoData: newArr,
      }
    })
  }

  onEdited = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  createTodoItem(text, time, minutes, seconds) {
    return {
      description: text,
      done: false,
      edit: false,
      id: this.maxId++,
      timeOfCreate: time,
      seconds: +seconds,
      minutes: +minutes,
      timer: this.timer++,
    }
  }

  render() {
    // const { todoData, filter, minutes, seconds, timer } = this.state
    const { todoData, filter } = this.state
    const doneCount = todoData.filter((el) => !el.done).length
    const filteredItems = this.filter(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            taskData={filteredItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEdited={this.onEdited}
            editItem={this.editItem}
            // minutes={minutes}
            // seconds={seconds}
            // timer={timer}
            // onStart={this.onStart}
            // onPause={this.onPause}
          />
          <Footer
            doneCount={doneCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onDeleteCompleted={this.onDeleteCompleted}
          />
        </section>
      </section>
    )
  }
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
