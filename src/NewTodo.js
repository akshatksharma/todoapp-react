import React, {Component} from 'react'
import './NewTodo.css'
import PropTypes from 'prop-types'

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ' ',
      placeholder: "Add new task...",
    }
  }

  change = (event_) => (this.setState({text: event_.target.value}))

  submit = (event_) => {
    event_.preventDefault();
    this.props.addTodo(this.state.text);
    this.setState({text: ''});
  }


  render() {

    return (
      <div className="addbar">
        <form className="card__add" action="index.html" method="post" id="form1" onSubmit = {this.submit}>

          <input className="noFormat" type="text"
            value = {this.state.text} onChange = {this.change} placeholder={this.state.placeholder}/>

          <button className="card__icon card__icon--add noFormat fas fa-plus fa-lg" form = "form1" type="submit" ></button>

          <i className="card__icon card__icon--sort fas fa-sort-alpha-down fa-lg" onClick = {this.props.sortToggle}></i>

          <i
            className="card__icon card__icon--trash fas fa-trash-alt fa-lg"
            onClick = {this.props.trashToggle}>
          </i>
        </form>
      </div>
    );
  }






}

export default NewTodo;
