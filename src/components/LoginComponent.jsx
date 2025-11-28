import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, storeToken, storeUser, storeUserRole } from '../services/AuthService'

const LoginComponent = () => {
    const navigator = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault();
        const loginData = {userName, password}
        await login(loginData).then((response) => {
            console.log(response.data)
            // The token is a Bearer token where token type is 'Bearer'            
            storeToken(response.data.tokenType + ' ' + response.data.accessToken)
            storeUser(userName)
            storeUserRole(response.data.role)
            navigator("/todos")
            // window.location.reload(false)
        }).catch(error => {
            console.error(error)
        });
    }

    return (
    
    <div className='container mt-3'>
       <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center mt-2'>Login</h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Username/Email:</label>
                        <input  type='text'  
                                // className={`form-control ${errors.userName ? 'is-invalid' : ''}`} 
                                className='form-control'
                                name='userName' 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)}
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
                    <button className='btn btn-success mt-2' onClick={(e) => handleLogin(e)} >Login</button>
                </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default LoginComponent