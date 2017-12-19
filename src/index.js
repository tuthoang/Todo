import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const AddToTaskForm = ({addTodo}) => {
  let task;
  return (
    <div>
      <input ref={node => {
        task = node;
      }} />
      <button onClick={() => {
        addTodo(task.value);
        task.value = '';
      }}>
        +
      </button>
    </div>
  );
}

const Todo = ({todo, remove}) => {
  return (
    <li onClick={() => {(remove(todo.id))}}> 
      {todo.text}
    </li>
  )
}

const ToDoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul> {todoNode} </ul>)
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
