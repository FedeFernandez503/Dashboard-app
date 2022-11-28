import { Navigate } from "react-router-dom"
export function Register({user}) {
    if (user.isLogin) {
        return   <Navigate to={"/user/:_id"}/>
      }
    return (
        <div>
            <h1>Register</h1>
        </div>
    )
}