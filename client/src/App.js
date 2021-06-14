import React from 'react'
//routes
import { useRoutes } from './routes'
//hooks
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
//contexts
import { AuthContext } from './context/AuthContext'
//components
import { Navbar } from './components/Navbar'
//styles
import 'materialize-css'


function App() {

  const { token, userId, login, logout } = useAuth()
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated)
  

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar/> }
        <div className="container">
            {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
