import React, { Component } from "react";
import "./App.css";

const default_todoList = [
  {
    content: "Meet with Ken",
    finished: false
  },
  {
    content: "Go to the grocery store",
    finished: true
  },
  {
    content: "Run around Frick Park",
    finished: true
  },
  {
    content: "Remember to buy milk",
    finished: false
  },
  {
    content: "Finish Homework 5",
    finished: false
  }
];


//TODO 3: Make it so that the user's todos load back when they refresh
//Hint: use localStorage.setItem/getItem and JSON.stringify/parse
//  if you mess up setting the local storage you can .clear() it

function load(){
  let str_todos = localStorage.getItem('todoList')
  //Using && to condition on str_todos else null
  return (str_todos && JSON.parse(str_todos)) 
}

function store(todoList){
  localStorage.setItem('todoList',JSON.stringify(todoList))
}

let loaded_todoList = load()

class App extends Component {
  state = {
    //Using || backup assignment
    todoList: loaded_todoList || default_todoList,
    newTodoContent: ""
  };
  toggleDone = (evt, i) => {
    let todoList = this.state.todoList;
    todoList[i].finished = !todoList[i].finished;
    this.setState({ todoList: todoList });
    store(todoList)
  };
  addItem = () => {
    //TODO 1: Make the add button work (hint: this.setState())
    let todoList = this.state.todoList;
    todoList.push({content: this.state.newTodoContent, finished:false})
    this.setState({ todoList: todoList });
    store(todoList)
  };
  deleteItem = (event, i) => {
    //TODO 2: Make the delete button work (hint: event.stopPropagation())
    event.stopPropagation()
    let todoList = this.state.todoList;
    todoList.splice(i,1)
    this.setState({ todoList: todoList });
    store(todoList)
  };

  render() {
    console.log("rerender");
    let list_content = [];
    for (let i = 0; i < this.state.todoList.length; i++) {
      let todo = this.state.todoList[i];
      list_content.push(
        <li
          key={todo.content + "_" + i.toString()}
          onClick={(evt) => this.toggleDone(evt, i)}
        >
          {todo.content}
          {/* Comment: Below the "Done!" icon is conditionally rendered */}
          {todo.finished && <div className="DoneIcon">Done!</div>}
          <div className="Filler"></div>
          <div className="DeleteIcon" onClick={(e) => this.deleteItem(e,i)}>
            {"x"}
          </div>
        </li>
      );
      console.log(todo);
    }

    return (
      <div className="App">
        <div className="Header">
          <h2>Simple To Do</h2>
          <input
            type="text"
            value={this.state.newTodoContent}
            onChange={(evt) => {
              console.log(evt.target.value);
              this.setState({ newTodoContent: evt.target.value });
            }}
            placeholder="new to do...."
          />
          <span onClick={() => this.addItem()} className="AddNewToDoButton">
            Add
          </span>
        </div>
        <ul>{list_content}</ul>
      </div>
    );
  }
}

export default App;
