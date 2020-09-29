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

class App extends Component {
  state = {
    todoList: default_todoList,
    newTodoContent: ""
  };
  toggleDone = (evt, i) => {
    console.log("done", i);
    let todoList = this.state.todoList;
    todoList[i].finished = !todoList[i].finished;
    this.setState({ todoList: todoList });
  };
  addItem = () => {
    //TODO 1: Make the add button work (hint: this.setState())
    console.log("AddItem", this.state.newTodoContent);
  };
  deleteItem = (event, i) => {
    //TODO 2: Make the delete button work (hint: event.stopPropagation())
    console.log("delete", i);
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
          <div className="DeleteIcon" onClick={(e) => console.log("delete")}>
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
