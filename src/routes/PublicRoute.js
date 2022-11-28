import { Navigate } from "react-router-dom";

export function PublicRoute({children}) {
    if(!user.isLogin) return <Navigate  to="/user/:_id"/>
    return (
        children 
    )
}