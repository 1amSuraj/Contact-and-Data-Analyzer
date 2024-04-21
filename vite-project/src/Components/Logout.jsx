import React, { useContext } from 'react'
import { UserContext } from '../App'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = () => {
    const {setUser} = useContext(UserContext)
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    MySwal.fire({
        title: "Are you sure?",
        text: "Do You Want to Exit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I Want!"
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()
            setUser(null)
            navigate("/")
          };
        });
};

export default Logout
