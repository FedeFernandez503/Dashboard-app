import { Home } from "./pages/Home"
import { Error404 } from "./pages/Error404"
import Login from "./pages/Login"
import { Register } from "./pages/Register"
import { User } from "./pages/User"
import { Dashboard } from "./pages/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { useState } from "react"

import { PrivateRoute } from "./routes/PrivateRoute"
//import { PublicRoute } from "./routes/PublicRoute"


const App = () => {
  const [user, setUser] = useState({isLogin: false});
  console.log(user)
  return (
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login user = {user} setUser={setUser}/>} />
          <Route exact path='/register' element={<Register user = {user}/>} />
          <Route exact path='/user/:_id' element={<PrivateRoute user = {user}><User/></PrivateRoute>} />
          <Route exact path='/dashboard' element={<PrivateRoute user = {user}><Dashboard/></PrivateRoute>} />
          <Route path='*' element={<Error404/>} />
        </Routes>
        <Footer/>
      </Router>
  )
}
export default App;
