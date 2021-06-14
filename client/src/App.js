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
import { Loader } from './components/Loader'
//styles
import 'materialize-css'


function App() {

  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated)
  
  if (!ready) {
    return(
      <Loader>

      </Loader>
    )
  }

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
