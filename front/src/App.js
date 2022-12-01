import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { Error404 } from "./pages/error-404/Error404"
import Login from "./pages/auth/login/Login"
import Register from "./pages/auth/register/Register"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"

import { PrivateRoute } from "./routes/PrivateRoute"

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route exact path='/' element={<Home user={user} />} />
        <Route exact path='/login' element={<Login setUser={setUser} />} />
        <Route exact path='/register' element={<Register setUser={setUser} />} />
        <Route exact path='/dashboard' element={<PrivateRoute user={user}><Dashboard user={user} /></PrivateRoute>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App;
