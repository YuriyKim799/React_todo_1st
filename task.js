// import React, { Component } from 'react'
// import { formatDistanceToNow } from 'date-fns'
// import PropTypes from 'prop-types'

// export default class Task extends Component {
//   static propTypes = {
//     description: PropTypes.string,
//     editItem: PropTypes.func.isRequired,
//     id: PropTypes.number,
//     edit: PropTypes.bool,
//     onDeleted: PropTypes.func,
//     onEdited: PropTypes.func,
//     onToggleDone: PropTypes.func,
//     done: PropTypes.bool,
//     timeOfCreate: PropTypes.array,
//   }

//   state = {
//     textValue: this.props.description,
//     minutes: 0,
//     seconds: 0,
//     timer: 0,
//   }

//   onSubmit = (event) => {
//     event.preventDefault()
//     this.props.editItem(this.props.id, this.state.textValue, this.props.edit)
//     this.setState({
//       textValue: '',
//     })
//   }

//   onLabelChange = (event) => {
//     this.setState({
//       textValue: event.target.value,
//     })
//   }

//   onStart = () => {
//     clearInterval(this.state.timer)
//     this.state.timer = setInterval(() => {
//       this.setState(({ seconds }) => ({
//         seconds: seconds + 1,
//       }))
//       if (this.state.seconds === 59) {
//         this.setState(({ minutes }) => ({
//           seconds: 0,
//           minutes: minutes + 1,
//         }))
//       }
//     }, 1000)
//   }

//   onPause = () => {
//     clearInterval(this.state.timer)
//   }

//   render() {
//     const { description, onDeleted, onEdited, id, onToggleDone, done, edit, timeOfCreate } = this.props
//     const { minutes, seconds, timer, textValue } = this.state
//     let classNames = ''
//     let mark = false

//     if (done) {
//       classNames = 'completed'
//       mark = true
//       clearInterval(timer)
//     }

//     if (edit) {
//       classNames = 'editing'
//     }

//     const result = formatDistanceToNow(new Date(...timeOfCreate), {
//       includeSeconds: true,
//     })

//     return (
//       <li className={classNames} id={id}>
//         <div className="view">
//           <input className="toggle" type="checkbox" checked={mark} onClick={onToggleDone} />

//           <label htmlFor="title">
//             <span className="title" onClick={onToggleDone} role="button" tabIndex={0} onKeyDown={onToggleDone}>
//               {description}
//             </span>

//             <span className="description">
//               <button className="icon icon-play" type="button" aria-label="play" onClick={this.onStart} />
//               <button className="icon icon-pause" type="button" aria-label="pause" onClick={this.onPause} />
//               <span className="time-span">
//                 {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//               </span>
//             </span>

//             <span className="description">created {result} ago</span>
//           </label>

//           <button aria-label="edit" type="button" className="icon icon-edit" onClick={onEdited} />
//           <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
//         </div>

//         <form onSubmit={this.onSubmit}>
//           <input type="text" className="edit" onChange={this.onLabelChange} value={textValue} />
//         </form>
//       </li>
//     )
//   }
// }

// Task.defaultProps = {
//   description: '',
//   onDeleted: () => 'object',
//   onEdited: () => 'onEdited',
//   id: 100,
//   onToggleDone: () => 'onToggleDone',
//   done: false,
//   edit: '',
//   timeOfCreate: [2023, 6, 5, 22, 58, 25],
// }
