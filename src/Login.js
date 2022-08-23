import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import { auth, provider } from './firebase'
import './Login.css'

function Login() {
  const dispatch = useDispatch()

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(({ user }) => {
        // 'login' is a action from userSlice.js
        dispatch(login({
            // payload
            displayName: user.displayName,   // displayName --> comes back from google that gave us back our user object
            email: user.email,
            photoUrl:  user.photoURL
        }))    
    })
    .catch(error => alert(error.message))
  }
  return (
    <div className='login'>
      <div className="login__container">
        <img src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Emblem.png" alt="gmail" />
        <Button variant="contained" color="primary" onClick={signIn}>Login</Button>
      </div>
    </div>
  )
}

export default Login
