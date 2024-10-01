import { HiOutlineXMark } from 'react-icons/hi2'
import '../assets/styles/accountForm.css'
import { AppContext } from './App'
import { useContext, useState } from 'react'

export default function LogIn() {
  const {
    port,
    setShowLogInModal,
    setToken,
    setNotFoundError,
    setShowRegisterModal,
    setShowSignUpOrSignInModal,
  } = useContext(AppContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [badRequestError, setBadRequestError] = useState(false)

  const handleFormChange = (e) => {
    if (badRequestError) {
      setBadRequestError(false)
    }

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch(`${port}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setBadRequestError(true)
          return
        }

        if (res.status === 404) {
          setNotFoundError(true)
          return
        }

        return res.json()
      })
      .then((data) => {
        if (data) {
          setToken(data.token)
          localStorage.setItem('jwt', data.token)
          setShowSignUpOrSignInModal(false)
        }
      })
  }

  return (
    <aside id="accountForm">
      <HiOutlineXMark
        id="exit"
        onClick={() => setShowSignUpOrSignInModal(false)}
      />

      <div id="form">
        <h4>Iniciar sessão</h4>

        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              name="email"
              onChange={handleFormChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Palavra-passe"
              autoComplete="password"
              name="password"
              onChange={handleFormChange}
              required
            />
          </div>

          {badRequestError && (
            <span id="missing-fields">
              O utilizador e a palavra-passe são necessários.
            </span>
          )}

          <button>Iniciar sessão</button>
        </form>

        <span id="no-account">Não tem conta?</span>

        <button
          id="create-account"
          onClick={() => [setShowLogInModal(false), setShowRegisterModal(true)]}
        >
          Criar conta
        </button>
      </div>
    </aside>
  )
}
