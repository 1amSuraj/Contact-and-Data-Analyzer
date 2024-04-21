import React, { useState } from 'react'
import '../assets/css/form.css'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../Components/Validation';
import axios from 'axios'
import {toast} from 'react-toastify'


const Register = () => {
  const [values,setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors,setErrors]=useState({})
  const [serverErrors,setServerErrors]=useState([])
  const navigate= useNavigate()
  const handleInput = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = Validation(values)
    setErrors(errs)
    if(errs.name === "" && errs.email === "" && errs.password === ""){
      axios.post('http://127.0.0.1:3000/contactmsyt/register',values)
      .then(res=> {
        if(res.data.success){
        toast.success("Account Created Successfully",{
          position: "top-right",
          autoClose: 5000
        })
        navigate('/login')
      }
      }).catch(err => {
          if(err.response.data.errors){
            setServerErrors(err.response.data.errors)
          }
          else{
            console.log(err);
          }
      })
    }
  }
  return (
    <div className="form-container">
      <form className='form' onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="name" className='form-label'>Name:</label>
          <input type="text" placeholder='Enter Name' className='form-control' name='name' onChange={handleInput}
          />
          {
            errors.name && <span className='error'>{errors.name}</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Email:</label>
          <input type="email" placeholder='Enter Email' className='form-control' name='email' autoComplete='off' onChange={handleInput}/>
          {
            errors.email && <span className='error'>{errors.email}</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="password" className='form-label'>Password:</label>
          <input type="password" placeholder='***********' className='form-control' name='password' onChange={handleInput}/>
          {
            errors.password && <span className='error'>{errors.password}</span>
          }
        </div>
        {
          serverErrors.length > 0 && (
            serverErrors.map((error,index) =>(
              <p className='error' key={index}>{error.msg}</p>
            ))
          )
        }
        <button className='form-btn'>Register</button>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;