import "./header.css"
import { NavLink } from "react-router-dom"
import {Navbar, Nav} from "react-bootstrap"

export function Header () {
  return (
      <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
          <Navbar.Brand>
          <div className='logo'>     
          </div>
          <h1>App To Do</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/user/:_id">User</Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
  )
}