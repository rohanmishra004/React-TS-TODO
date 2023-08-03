import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import {AiFillEdit , AiFillDelete } from 'react-icons/ai'
import { MdDone} from 'react-icons/md'

interface Props{
    todo: Todo;
    todos: Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}





const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

    //---------------------------------------------------------------
    //Adding Edit Functionality - For adding edit we will be using two states
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    


    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (
            todo.id === id ? {
                ...todo, todo: editTodo
            } : todo
        )));
        setEdit(false)
    }


    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        inputRef.current?.focus()
    },[edit])



    //-------------------------------------------------------------

    //Change the Done Status
    const handleDone = (id: number) => {
        setTodos(todos.map((todo)=>todo.id === id?{...todo, isDone:!todo.isDone}:todo))
    }

    //Add Delete Functionality
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }


    return ( 
        <form className="todos__single" onSubmit={(e)=>handleEdit(e,todo.id)}>

            {
                edit ? (
                    <input
                        ref={inputRef}
                        value={editTodo}
                        onChange={(e) => {
                            setEditTodo(e.target.value)
                        }}
                        className="todos__single--text"
                    />
                ): todo.isDone ? (
                    <s className="todos__single--text">{todo.todo}</s>
                ):(
                    <span className="todos__single--text">{todo.todo}</span>
                        
                )
            }
            
            <div>
                <span
                    className="icon"
                    onClick={
                        //This means that if the todo is still not complete only then we can edit it
                        () => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit)
                            }
                        }
                        
                    }>
                    <AiFillEdit /></span>
                <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone /></span>
            </div>
        </form>
     );
}
 
export default SingleTodo;