import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" replace />
}

export default ProtectedRoutes
