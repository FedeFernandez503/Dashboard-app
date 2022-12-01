import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, user }) {
    console.log(user)
    if (!user) return <Navigate to="/login" />
    return (
        children
    )
}