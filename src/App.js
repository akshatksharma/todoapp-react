import React, {Component} from  'react';
import './App.css';
import NewTodo from './NewTodo';
import Todos from './Todos'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      trashMode: false,
      sort: true
    }
  }

  render() {
    return (
      <div className="page">
        <div className="header">
          <h1>akshat's todo app</h1>
        </div>
        <NewTodo
          addTodo = {this.addTodo}
          sortToggle = {this.sorter}
          trashToggle = {this.trashToggle}/>
        <Todos
          todos={this.state.todos}
          markComplete = {this.markComplete}
          deleteTodo = {this.deleteTodo}
          trashMode = {this.state.trashMode}
          />
      </div>
    );
  }

  componentDidMount() {
    fetch("https://cse204.work/todos", {
      method: 'get',
      headers: new Headers({"x-api-key": "282249-1d671a-84317a-368f87-455eb2"})
    })
    .then(res => {
      if (!res.ok) {
        console.log("failure");
        return;
      }
      return res.json();
    }).then(data => {
      console.log(data)
      this.setState({
        todos : data
      })
      // console.log(this.state.todos)
    })
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id == id) {
          console.log(id)
          todo.completed = !todo.completed;

          fetch("https://cse204.work/todos/" + id, {
            method: 'put',
            headers: new Headers({"x-api-key": "282249-1d671a-84317a-368f87-455eb2", "Content-type": "application/json"}),
            body: JSON.stringify({
              completed: todo.completed
            })
          }).then(res => {console.log(res)})
        }
        return todo;
      })
    })
  }

  deleteTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    })
    fetch("https://cse204.work/todos/" + id, {
      method: 'delete',
      headers: new Headers({"x-api-key": "282249-1d671a-84317a-368f87-455eb2"})
    }).then(res => {
      console.log(res)
    })

  }

  addTodo = (text) => {
    if (text == " ") {
      return
    }
    fetch("https://cse204.work/todos", {
      method: 'post',
      headers: new Headers({"Content-type": "application/json", "x-api-key": "282249-1d671a-84317a-368f87-455eb2"}),
      body: JSON.stringify({
        "text": text
      })
    }).then(res => {
        if(!res.ok) {
          console.log("Error! Code: " + res.status);
          return;
        }
        return res.json();
    }).then(data => {
        this.setState({
          todos: [...this.state.todos, data]
        })
      })
  }



  sorter = () => {

      if (this.state.sort) {

        let sortArray = [...this.state.todos].sort((a,b) => {
          const itemA = a.text.toLowerCase();
          const itemB = b.text.toLowerCase();
          let comp = 0;

          if (itemA > itemB) {
            comp = 1;
          } else if (itemA < itemB) {
            comp = -1;
          }
          return comp
          })

        this.setState({
          todos: sortArray
        })
      }

  }


  trashToggle = () => {
    console.log(this.state.trashMode)
    this.setState({
      todos: [...this.state.todos],
      trashMode: !this.state.trashMode
    })
  }


}

export default App;
