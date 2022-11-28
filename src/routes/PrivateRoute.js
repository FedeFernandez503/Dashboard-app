import { Navigate } from "react-router-dom";

export function PrivateRoute({children, user}) {
    if(!user.isLogin) return <Navigate  to="/login"/>
    return (
        children 
    )
}