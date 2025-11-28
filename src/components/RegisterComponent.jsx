import React, { useState } from 'react'
import { register } from '../services/AuthService'

const RegisterComponent = () => {
  const [name, setName]  = useState('')
  const [userName, setUserName]  = useState('')
  const [email, setEmail]  = useState('')
  const [password, setPassword]  = useState('')

  function handleRegister(e){
    // to do: add validation
    e.preventDefault()
    const registration = {name, userName, email, password}
    register(registration).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.error(error)
    })
  }
  return (
    <div className='container mt-3'>
       <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center mt-2'>Registration</h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Name:</label>
                        <input  type='text' 
                                // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                className='form-control'
                                name='name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                />
                        {/* {errors.name && <div className='invalid-feedback'>{errors.name}</div>} */}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Username:</label>
                        <input  type='text'  
                                // className={`form-control ${errors.userName ? 'is-invalid' : ''}`} 
                                className='form-control'
                                name='userName' 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)}
                                />
                        {/* {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>} */}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Email:</label>
                        <input  type='text'  
                                // className={`form-control ${errors.userName ? 'is-invalid' : ''}`} 
                                className='form-control'
                                name='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        {/* {errors.email && <div className='invalid-feedback'>{errors.email}</div>} */}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Password:</label>
                        <input  type='password'  
                                // className={`form-control ${errors.userName ? 'is-invalid' : ''}`} 
                                className='form-control'
                                name='password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        {/* {errors.password && <div className='invalid-feedback'>{errors.password}</div>} */}
                    </div>   
                    <button className='btn btn-success mt-2' onClick={(e) => handleRegister(e)} >Register</button>
                </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default RegisterComponent