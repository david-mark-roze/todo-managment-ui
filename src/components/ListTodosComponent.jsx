import React, { useEffect, useRef, useState } from 'react'
import { completeTodo, deleteTodo, listTodos, reopenTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { isUserAdmin } from '../services/AuthService'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"

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

   function toggleStatus(e, id, complete){
        e.preventDefault()
        if(complete){
            handleReopen(id)
        } else {
            handleComplete(id)
        }
   }

   function openUpdate(e, id){
        e.preventDefault();
        navigator(`/update-todo/${id}`)
   }

     // Populate the list of todos with data from the server
   useEffect(() => getAllTodos(), [])
   
  const modalRef = useRef(null);

  const [modalTodoId, setModalTodoId] = useState('')
  const [modalTodoStatus, setModalTodoStatus] = useState('')

  useEffect(() => {
    const modalElement = document.getElementById("statusModal");
    modalRef.current = new bootstrap.Modal(modalElement);
  }, []);

  function openModal(e, id, status) {
    e.preventDefault();
    setModalTodoId(id)
    setModalTodoStatus(status)
    modalRef.current.show();
  };

  return (
    <div className='container'>
        <h1 className="text-center">To Do Items</h1>
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
                                    <a href='#' onClick={(e) => openUpdate(e, todo.id)}>Update</a>
                                    
                                }                                
                                {/* <a href='#' className='margin-left-10' onClick={(e) => toggleStatus(e, todo.id, todo.complete)}>{todo.complete ? 'Reopen': 'Complete'}</a> */}
                                <a href='#' className='margin-left-10' onClick={(e) => openModal(e, todo.id, todo.complete)}>{todo.complete ? 'Reopen': 'Complete'}</a>
                                {
                                    adminUser &&                                                                
                                    <a href='#' className='margin-left-10' onClick={() => handleDelete(todo.id)}>Delete</a>
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
         <div className="modal fade"id="statusModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
                <p>{modalTodoId}</p>
                <p>{modalTodoStatus ? 'Complete' : 'Incomplete'}</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>

              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
  )
}

export default ListTodosComponent