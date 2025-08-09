import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function PrivateRoute({ children }){
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App(){
  return (
    <AuthProvider>
      <div className="container">
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2><Link to="/">Link Saver</Link></h2>
          <nav className="small">
            <Link to="/">Home</Link> {' | '}
            <Link to="/login">Login</Link> {' | '}
            <Link to="/register">Register</Link>
          </nav>
        </header>

        <main style={{marginTop:20}}>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}