import { createContext, useEffect, useState } from 'react'
import Header from './Header'
import HomePage from './HomePage'
import Footer from './Footer'
import IncorrectLogIn from './IncorrectLogIn'
import '../assets/styles/App.css'
import SignUpOrSignIn from './SignUpOrSignIn'
import ExistingEmail from './ExistingEmail'

export const AppContext = createContext()

export default function App() {
  const port = import.meta.env.VITE_PORT
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('jwt') || '')
  const [showSignUpOrSignInModal, setShowSignUpOrSignInModal] = useState(false)
  const [showLogInModal, setShowLogInModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [userLogedIn, setUserLogedIn] = useState(false)
  const [notFoundError, setNotFoundError] = useState(false)
  const [existingUniqueFieldError, setExistingUniqueFieldError] =
    useState(false)

  useEffect(() => {
    if (!showSignUpOrSignInModal) {
      setShowLogInModal(false)
      setShowRegisterModal(false)
    }
  }, [showSignUpOrSignInModal])

  useEffect(() => {
    if (!token) {
      setUserLogedIn(false)
      return
    }

    fetch(`${port}/users/account`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 404) {
          setUserLogedIn(false)
          return
        }

        return res.json()
      })
      .then((data) => {
        if (data) {
          setUser(data.user)
          setUserLogedIn(true)
        }
      })
  }, [port, token])

  return (
    <AppContext.Provider
      value={{
        port,
        setToken,
        userLogedIn,
        user,
        setNotFoundError,
        setShowSignUpOrSignInModal,
        setShowLogInModal,
        setShowRegisterModal,
        showLogInModal,
        showRegisterModal,
        setExistingUniqueFieldError,
      }}
    >
      <Header />

      <HomePage />

      <Footer />

      {showSignUpOrSignInModal && <SignUpOrSignIn />}

      {(notFoundError || existingUniqueFieldError) && (
        <div id="modal-visible"></div>
      )}

      {notFoundError && <IncorrectLogIn />}

      {existingUniqueFieldError && <ExistingEmail />}
    </AppContext.Provider>
  )
}
