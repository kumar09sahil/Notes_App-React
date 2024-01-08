import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"", email: "", password: "", cpassword:"" });
  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    // const {name, eamil, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email:credentials.email,
         password: credentials.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showalert("Account created succesfully","success")
    } else {
      props.showalert("user already exists","danger");
    }
  };
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
        <div>
           <h2 className='text-center'>create your account to use enotebook</h2>
        <form onSubmit={handlesubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name </label>
      <input type="text" className="form-control" onChange={onchange} id="name" name='name' value={credentials.name} aria-describedby="emailHelp" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email </label>
      <input type="email" className="form-control" onChange={onchange} id="email" name='email' value={credentials.email} aria-describedby="emailHelp" required/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" onChange={onchange} id="password" name='password' value={credentials.password} minLength={5} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" onChange={onchange} id="cpassword" name='cpassword' value={credentials.cpassword} minLength={5} required/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
      </div>
  );
};

export default Signup;
