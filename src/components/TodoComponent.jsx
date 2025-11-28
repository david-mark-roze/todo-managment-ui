import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToDo, getTodo, updateTodo } from '../services/TodoService'

const TodoComponent = () => {

  const {id} = useParams();

  const navigator = useNavigate() 
  const [title, setTitle]  = useState('')
  const [description, setDescription]  = useState('')
  const [complete, setComplete]  = useState(false)
    
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    complete: ''
  })

  useEffect(()=>{
    if(id){
        getTodo(id).then(response => {
            setTitle(response.data.title)
            setDescription(response.data.description)
            setComplete(response.data.complete)
            console.log(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

  },[id])

  function save(e) {
    e.preventDefault()
    if(validateForm()){
        const todo = {title, description, complete}
        if(id){
            updateTodo(id, todo).then(response => {
                console.log(response.data)
                navigator('/todos')
            }).catch(error=> {
                console.error(error)
            })
        } else {
            addToDo(todo).then(response => {
                console.log(response.data)
                navigator('/todos')
            }).catch(error=> {
                console.error(error)
            })
        }
    } 
  }

  function cancel(e){
    e.preventDefault();
    navigator('/todos')
  }

  function validateForm(){
        let valid = true;
        // Copy all errors - i.e. a 'destructure'(... indicates the 'spread') to the errorsCopy object
        const errorsCopy = {...errors}
        // Will indicate that the field contains a value
        if(title.trim()){
            errorsCopy.title = ''
        } else{
            errorsCopy.title = "Title Name is required"
            valid = false
        }
        if(description.trim()){
            errorsCopy.description = ''
        } else{
            errorsCopy.description = "Description is required"
            valid = false
        }
        // if(complete.trim()){
        //     errorsCopy.complete = ''
        // } else{
        //     errorsCopy.complete = "Status is required"
        //     valid = false
        // }
        setErrors(errorsCopy)
        return valid;
    }
  return (
    <div className='container mt-3'>
       <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center mt-2'>{id ? 'Update To Do Item': 'Add To Do Item'}</h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Title:</label>
                        <input  type='text' 
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                name='title' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Description:</label>
                        <input  type='text'  
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                                name='description' 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                />
                        {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Status:</label>
                        <select className='form-control' value={complete} onChange={(e) => setComplete(e.target.value)}>
                            <option value="true">Complete</option>
                            <option value="false">Incomplete</option>
                        </select>   
                    </div>
                    <div className='centre'>
                        <button className='btn btn-success mt-2' onClick={(e) => save(e)} >Save</button>
                        <button className='btn btn-success mt-2 margin-left-10' onClick={(e) => cancel(e)} >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default TodoComponent