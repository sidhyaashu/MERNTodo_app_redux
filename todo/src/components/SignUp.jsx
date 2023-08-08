import { NavLink, useNavigate } from 'react-router-dom'
import './App.css'
import { useRef, } from 'react'
import axios from 'axios'

const SignUp = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSignUp = async(e)=>{
    e.preventDefault()
    const username = nameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:4000/register",{
        name:username,
        password
      })
      let {data} = response
      console.log(data.message)
      navigate("/")
    } catch (error) {
      console.log("Error in registering user",error)
    }
  }
  

  const handleUsers =async()=>{
    try {
      const {data} = await axios.get("http://localhost:4000/users")
      console.log(data)
    } catch (error) {
      console.log("Error to fetch users",error)
    }
  }

  return (
    <div className="loginCard">
      <p>SignUp</p>
      <div className="inputs">
        <input type="text" placeholder='Enter your name' ref={nameRef} />
        <input type="password" placeholder='Enter your password' ref={passwordRef} />
        <button onClick={handleSignUp} >SignUp</button>
        <NavLink className="goto" to='/'>Go to <b>Login</b> page</NavLink>
        <button onClick={handleUsers}>GetUsers</button>
      </div>
    </div>
  )
}

export default SignUp
