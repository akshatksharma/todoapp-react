import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './Todos.css';
import Todo from "./Todo"

class Todos extends Component {

    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className = "cards">
           {this.props.todos.map(todo => {
             try {
               return <Todo
                 key = {todo.id}
                 todo = {todo}
                 completed = {todo.completed}
                 markComplete = {this.props.markComplete}
                 deleteTodo = {this.props.deleteTodo}
                 trashMode = {this.props.trashMode}/>
             } catch (e) {
               return;
             }
           })}
        </div>
      )
    }
}

export default Todos
