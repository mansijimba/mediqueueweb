import React, { useContext } from 'react'
import RegisterForm from '../components/auth/registerForm'
import { AuthContext } from '../auth/AuthProvider';

export default function Register() {
  const user = useContext (AuthContext)
  
     if(user) {
        return (
            <div>
                You are already registered
            </div>
        )
    }
  return (
    <div>Register
      <RegisterForm/>
    </div>
  )
}
