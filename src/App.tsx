import React from 'react';
import './App.css';
import InputField from './component/InputField';
import { useState } from 'react';
import { Todo } from './model'
import TodoList from './component/TodoList'

//React FC - functional Component
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])


  //handle add functionality
  const addTodo = (e:React.FormEvent) => {
    e.preventDefault()
    
    //first check if todo is present or not 
    if (todo) {
      setTodos([...todos , {
        id: Date.now(),
        todo,
        isDone:false
      }])
      setTodo("")
    }
  }
  console.log(todos)
  return (
    <div className="App">
      <span className='heading'>Taskify</span>

      <InputField todo={todo} setTodo={setTodo} addTodo={addTodo} />

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
