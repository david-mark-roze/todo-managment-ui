import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, listTodos, reopenTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { isUserAdmin } from '../services/AuthService'

const ListTodosComponent = () => {
   const adminUser = isUserAdmin();

   const navigator = useNavigate()

    // Initialise the employees state data array to be empty
   const [todos, setTodos] = useState([])

   function getAllTodos(){
        listTodos().then(response => {
            setTodos(response.data)
        }).catch(error => {
            console.error(error)
        })
   }
   
   function handleDelete(id) {
        deleteTodo(id).then(response => {
            console.log(response.data)
            getAllTodos()
        }).catch(error => {
            console.error(error)
        })
   }

   function handleComplete(id){
        completeTodo(id).then(response => {
            console.log(response.data)
            getAllTodos()
        }).catch(error => {
            console.error(error)
        })
   }

   function handleReopen(id){
        reopenTodo(id).then(response => {
            console.log(response.data)
            getAllTodos()
        }).catch(error => {
            console.error(error)
        })
   }

   function toggleStatus(id, complete){
        if(complete){
            handleReopen(id)
        } else {
            handleComplete(id)
        }
   }
   
   function statusComponent(complete, id){
        if(complete){
            return <button className='btn btn-info margin-left-10' onClick={() => handleComplete(id)}>Complete</button>
        } else {
            return <button className='btn btn-info margin-left-10' onClick={() => handleReopen(id)}>Reopen</button>
        }
   }

   // Populate the list of todos with data from the server
   useEffect(() => getAllTodos(), [])

  return (
    <div className='container'>
        <h1 className="text-center">To Do Items</h1>
        {
            adminUser && 
                <button className='btn btn-primary mb-2' onClick={() => navigator('/add-todo')}>Add</button>
        }
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo) => 
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.complete ? 'Complete': 'Incomplete'}</td>
                            <td>
                                {
                                    adminUser && 
                                    <button className='btn btn-info' onClick={() => navigator(`/update-todo/${todo.id}`)}>
                                        Update
                                    </button>
                                }                                
                                <button className='btn btn-info margin-left-10' onClick={() => toggleStatus(todo.id, todo.complete)}>
                                    {todo.complete ? 'Reopen': 'Complete'}
                                </button>
                                {
                                    adminUser &&
                                    <button className='btn btn-danger margin-left-10' onClick={() => handleDelete(todo.id)}>
                                        Delete
                                    </button>
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
  )
}

export default ListTodosComponent