import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate = useNavigate()
    const handlesubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email, password: credentials.password  }),
          });
          const json =await response.json()
          console.log(json)
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showalert("logged in succesfully","success")
          }
          else{
            props.showalert("invalid credentials","danger")
          }
        
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      };

  return (
    <div>
      <h2 className='text-center'>Login to your account</h2>
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email </label>
    <input type="email" className="form-control" onChange={onchange} id="email" name='email' value={credentials.email} aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} id="password" name='password' value={credentials.password} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
