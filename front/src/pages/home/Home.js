import "./Home.css"
import { Link } from "react-router-dom"
export function Home({ user }) {
    return (
        <div id="fondoHome">
            <div className="home__ctn">
                <h1>Task App</h1>
                <p>Welcome to the best app to organize your tasks at a profesional level</p>
                <div id="containerButtons">
                    {user ?
                        <Link to='/dashboard' className="buttons">Continue Creating</Link>
                        :
                        <>
                            <Link to='/register' className="buttons">Login</Link>
                            <Link to='/register' className="buttons">Register</Link>
                        </>}
                </div>
            </div>
        </div>
    )
}