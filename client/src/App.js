import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import 'materialize-css'

function App() {

  const { token, userId, login, logout } = useAuth()
  const routes = useRoutes(false)

  return (
    <Router>
      <div className="container">
          {routes}
      </div>
    </Router>
  );
}

export default App;
