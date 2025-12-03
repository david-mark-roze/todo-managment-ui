import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import ListTodosComponent from './components/ListTodosComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { FooterComponent } from './components/FooterComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import AccessErrorComponent from './components/AccessErrorComponent'
import ErrorComponent from './components/ErrorComponent'

function App() {

  function AuthenticatedRoute({children}){
    let loggedIn = isUserLoggedIn()
    if(loggedIn){
      return children;
    }
    return <Navigate to='/'/>
  }

  return (
    <>
    <BrowserRouter>    
      <HeaderComponent/>
      <Routes>
          <Route path='/register' element={<RegisterComponent/>} />
          <Route path='/' element={<LoginComponent/>} /> 
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/access-error' element={<AccessErrorComponent/>} />
          <Route path='/error' element={<ErrorComponent/>} />
          {/* Activated when calling the to tod list directly */}
          <Route path='/todos' element = {
            <AuthenticatedRoute>
              <ListTodosComponent/>
            </AuthenticatedRoute>
            
          } />
          <Route path='/add-todo' element = {
            <AuthenticatedRoute>
              <TodoComponent/>
            </AuthenticatedRoute>
          } />
          <Route path='/update-todo/:id' element = {
             <AuthenticatedRoute>
              <TodoComponent/>
            </AuthenticatedRoute>
          } />
      </Routes>
      {/* <FooterComponent/> */}
    </BrowserRouter>
    </>
  )
}

export default App
