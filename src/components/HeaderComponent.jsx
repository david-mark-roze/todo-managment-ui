import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserAdmin, isUserLoggedIn, logout } from '../services/AuthService'

export const HeaderComponent = () => { 
  
  const navigator = useNavigate()

  function handleLogout(){
      logout()
      navigator('/login')
      window.location.reload()
  }
  return (
    <div>
      <header>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <a className="navbar-brand" href="#">To Do Item Management</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                      isUserLoggedIn() &&
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/todos">To Do Items</NavLink>
                      </li>
                    } {
                      isUserAdmin() &&
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/add-todo">Add Item</NavLink>
                      </li>
                    }
                  </ul>
              </div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {!isUserLoggedIn() &&
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                  }
                  {
                    !isUserLoggedIn() &&
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                  }
                  {
                    isUserLoggedIn() &&
                    <li className="nav-item">
                      <NavLink className="nav-link" onClick={() => handleLogout()}>Logout</NavLink>
                    </li>
                  }
              </ul>
          </nav>
      </header>
    </div>
  )
}
