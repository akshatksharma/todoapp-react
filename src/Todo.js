import React, {Component} from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
  }

  markStyle = () => {
    return {
      textDecoration: this.props.completed ? 'line-through' : 'none'
    }
  }

  showStyle = () => {
    return {
      display: this.props.trashMode ? "block" : "none"
    }
  }

  render() {
    const {id, text, completed} = this.props.todo;
    return (
      <div className = "card__item">
        <input type = "checkbox" onChange = {this.props.markComplete.bind(this, id)} checked = {completed}></input>
        <p className="card__text" style = {this.markStyle()}>{text}</p>
        <i
          className=" card__icon card__icon--delete fas fa-times fa-md"
          onClick = {this.props.deleteTodo.bind(this, id)}
          style = {this.showStyle()}>
        </i>
      </div>
    );
  }

}

export default Todo;
