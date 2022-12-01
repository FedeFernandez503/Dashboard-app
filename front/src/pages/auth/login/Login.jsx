import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, Navigate } from "react-router"
import "./Login.css"
import "../Auth.css"

const Login = ({ setUser }) => {
	const [inputsValues, setInputsValues] = useState({
		username: "",
		password: "",
	})
	const [mensaje, setMensaje] = useState(null)
	const [loading, setLoading] = useState()
	const { username, password } = inputsValues
	const navigate = useNavigate()
	const handleInputChange = (e) => {
		setInputsValues({ ...inputsValues, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (username !== "" && password !== "") {
			setLoading(true)
			fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(inputsValues),
			})
				.then((res) => {
					if (res.ok) return res.json()
					else return Promise.reject()
				})
				.then((user) => {
					console.log(user)
					setUser(user)
					navigate(`/dashboard`, { state: true })
				})
				.catch((error) => {
					console.error(error)
					setMensaje("Hubo un error")
					setLoading(false)
				})
		}
	}
	return (
		<section className="auth__ctn">
			<form className="auth__form" onSubmit={handleSubmit}>
				<h2 className="auth__title">Login</h2>
				<label className="auth__input">
					<p>Username:</p>
					<input
						value={username}
						name="username"
						onChange={handleInputChange}
						required
					/>
				</label>
				<label className="auth__input">
					<p>Password:</p>
					<input
						type="password"
						value={password}
						name="password"
						onChange={handleInputChange}
						required
					/>
				</label>
				<button className="auth__submit">
					{loading ? "Cargando..." : "Login"}
				</button>
				<p className="auth__change-form">
					<span>Don't have an account yet?</span>
					<Link to="/register" className="link">
						Sign Up
					</Link>
				</p>
			</form>
			{mensaje && (
				<div>
					<p>{mensaje}</p>
				</div>
			)}
		</section>
	)
}

export default Login
