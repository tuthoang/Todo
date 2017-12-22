import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup, ListGroupItem, Form, FormControl, FormGroup, Button, InputGroup }from 'react-bootstrap';
import './index.css';

const AddToTaskForm = ({addTodo}) => {
  let task;
  return (
    <div >
      <Form>
        <FormGroup>
          <InputGroup>
            <FormControl inputRef={node => {
                task = node;
              }} placeholder="Type in a task"/>
            <InputGroup.Button>
              <Button onClick={() => {
                addTodo(task.value);
                console.log(task.value);
                task.value = '';
              }} bsStyle="success">
                +
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}

const Todo = ({todo, remove}) => {
  return (
    <ListGroupItem onClick={() => {(remove(todo.id))}}> 
      {todo.text}
    </ListGroupItem>
  )
}

const ToDoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ListGroup> {todoNode} </ListGroup>)
}
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    super(props);

    this.state={
      data: []
    }
  }

  insertTask(task){
    let todo = {
      text: task, 
      id: window.id++
    }
    let list = this.state.data;
    list.push(todo);
    this.setState({data: list});
  }

  removeTask(id){
    let new_tasks = this.state.data.filter(task => task.id !== id)

    this.setState({data: new_tasks});
  }

  render() {
    return(
      <div>
        <AddToTaskForm addTodo={this.insertTask.bind(this)}/>
        <ToDoList
          todos={this.state.data}
          remove={this.removeTask.bind(this)}
        />
      </div>
    )
  }
}
ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
