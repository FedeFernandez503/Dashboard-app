import { NavLink } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg"
import "./Header.css"

export function Header({ user, setUser }) {
  return (
    <header className="header__ctn">
      <div className="header__nav-ctn">
        <Nav.Link as={NavLink} to="/" className="">
          <h1 className="header__title">App To Do</h1>
        </Nav.Link>
        <nav>
          <ul>
            {
              user ?
                <>
                  <li>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link as={NavLink} to="/login" onClick={() => setUser(null)}>Logout<LogoutIcon width={15} fill="#fff" style={{ marginLeft: 10 }} /></Nav.Link>
                  </li>
                </> :
                <>
                  <li>
                    <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link as={NavLink} to="register">Register</Nav.Link>
                  </li>
                </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}