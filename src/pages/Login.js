//import React, { Component } from "react"
import "./login.css"
import { Link } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
import { useNavigate, Navigate} from "react-router";

const Login = ({user, setUser}) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState();
  const {username, password} = inputs;
  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(username !== "" && password !== "") {
      const Usuario = {
        username,
        password
      };
      setLoading(true);
      await axios
      .post("http://localhost:5000/auth/login", Usuario)
      .then(({data}) => {
        setMensaje(data.mensaje);
        setInputs({username: "", password: ""});
        setTimeout(() => {
          setMensaje("");
          setLoading(false);
          navigate(`/user/:_id`, {state: true});
          setUser(() => ({isLogin: true, data}))
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMensaje("Hubo un error");
        setTimeout(() => {
          setMensaje("");
          setLoading(false);
        }, 1500);
      })
    }
  };
  const navigate = useNavigate();
  if (user.isLogin) {
    return   <Navigate to={"/user/:_id"}/>
  }
  return (
    <section className='container'>
      <div className='container'>
        <h3 id="titleLogin">Login</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="username"></label>
          <input type='text' value={username} id="username" name="username" onChange={(e) => onChange(e)} required  />
          <label htmlFor="password"></label>
          <input type='password' value={password} id="password" name="password" onChange={(e) => onChange(e)} required/>
          <button className='button' type='submit' >
            {loading ? "Cargando..." : "Login"}
          </button>
          <Link to='/register' className='link'>
            Register
          </Link>
        </form>
          
      </div>
      {mensaje && <div>{mensaje}</div>}
    </section>
  )
}

export default Login ;
  