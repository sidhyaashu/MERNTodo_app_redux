import './App.css'
import { NavLink } from 'react-router-dom'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../redux/reducers/loginReducers'
import { useDispatch } from 'react-redux'



const Login = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()

  const handleLogin = async(e)=>{
    e.preventDefault()
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const {data} = await axios.post("http://localhost:4000/login",{
        name,
        password
      })
      console.log(data.message)
      dispatch(setUser(data.user)) // save user to the global store
      navigate("/todo",{state:{username:name}})
    } catch (error) {
      console.log("Error in Login user",error)
    }
  }
  

  return (
    <div className="loginCard">
      <p>Login</p>
      <div className="inputs">
        <input type="text" placeholder='Enter your name' ref={nameRef} />
        <input type="password" placeholder='Enter your password'  ref={passwordRef} />
        <button onClick={handleLogin} >Login</button>
        <NavLink className="goto" to='/signup'>Go to <b>SignUp</b> page</NavLink>
      </div>
    </div>
  )
}

export default Login
