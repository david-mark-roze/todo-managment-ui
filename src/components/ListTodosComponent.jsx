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
            deleteModal.current.hide()
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
        //e.preventDefault()
        if(complete){
            handleReopen(id)
        } else {
            handleComplete(id)
        }
        statusModal.current.hide();
   }

   function openUpdate(e, id){
        e.preventDefault();
        navigator(`/update-todo/${id}`)
   }

     // Populate the list of todos with data from the server
   useEffect(() => getAllTodos(), [])
   
  const statusModal = useRef(null);
  const deleteModal = useRef(null);

  const [statusTodoId, setStatusTodoId] = useState('')
  const [modalTodoStatus, setModalTodoStatus] = useState('')

  const [deleteTodoId, setDeleteTodoId] = useState('')

  useEffect(() => {
    const statusModalElement = document.getElementById("statusModal");
    const deleteModalElement = document.getElementById("deleteModal");
    
    statusModal.current = new bootstrap.Modal(statusModalElement);
    deleteModal.current = new bootstrap.Modal(deleteModalElement);
  }, []);

  function openStatusModal(e, id, status) {
    e.preventDefault();
    setStatusTodoId(id)
    setModalTodoStatus(status)
    statusModal.current.show();
  };
  
  function openDeleteModal(e, id) {
    e.preventDefault();
    setDeleteTodoId(id)
    deleteModal.current.show();
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
                                <a href='#' className='margin-left-10' onClick={(e) => openStatusModal(e, todo.id, todo.complete)}>{todo.complete ? 'Reopen': 'Complete'}</a>
                                {
                                    adminUser &&                                                                
                                    // <a href='#' className='margin-left-10' onClick={() => handleDelete(todo.id)}>Delete</a>                                                              
                                    <a href='#' className='margin-left-10' onClick={(e) => openDeleteModal(e, todo.id)}>Delete</a>
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
         <div className="modal fade"id="statusModal" aria-labelledby="statusModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="statusModalLabel">{modalTodoStatus ? 'Reopen' : 'Complete'} Item</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you wish to {modalTodoStatus ? 'Reopen' : 'Complete'} this item?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={() => toggleStatus(statusTodoId, modalTodoStatus)}>
                    Yes
                  </button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
         <div className="modal fade"id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">Delete Item</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you wish to delete this item?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteTodoId)} >
                    Yes
                  </button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ListTodosComponent