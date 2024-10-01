import { useContext } from 'react'
import '../assets/styles/SignUpOrSignIn.css'
import LogIn from './LogIn'
import Register from './Register'
import { AppContext } from './App'

export default function SignUpOrSignIn() {
  const { showLogInModal, showRegisterModal } = useContext(AppContext)

  return (
    <aside id="signup-signin-modal">
      {showLogInModal && <LogIn />}

      {showRegisterModal && <Register />}
    </aside>
  )
}
