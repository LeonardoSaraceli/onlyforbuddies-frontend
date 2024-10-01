import { HiOutlineXMark } from 'react-icons/hi2'
import '../assets/styles/accountForm.css'
import { useContext, useState } from 'react'
import { AppContext } from './App'

export default function Register() {
  const {
    port,
    setShowRegisterModal,
    setExistingUniqueFieldError,
    setShowLogInModal,
    setShowSignUpOrSignInModal,
  } = useContext(AppContext)

  const [badRequestError, setBadRequestError] = useState(false)
  const [wrongMatchPassword, setWrongMatchPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleFormChange = (e) => {
    if (badRequestError) {
      setBadRequestError(false)
    }

    if (wrongMatchPassword) {
      setWrongMatchPassword(false)
    }

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.repeatPassword) {
      setWrongMatchPassword(true)
      return
    }

    fetch(`${port}/users/register`, {
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

        if (res.status === 409) {
          setExistingUniqueFieldError(true)
          return
        }

        return res.json()
      })
      .then((data) => {
        if (data) {
          setShowRegisterModal(false)
          setShowLogInModal(true)
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
        <h4>Criar conta</h4>

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

          <div>
            <input
              type="password"
              placeholder="Repetir palavra-passe"
              autoComplete="password"
              name="repeatPassword"
              onChange={handleFormChange}
              required
            />
          </div>

          {badRequestError && (
            <span id="error-message">
              O utilizador e as palavras-passes são necessários.
            </span>
          )}

          {wrongMatchPassword && (
            <span id="error-message">As palavras-passes não coincidem.</span>
          )}

          <button>Registrar</button>
        </form>

        <span id="no-account">Possui conta?</span>

        <button
          id="create-account"
          onClick={() => [setShowLogInModal(true), setShowRegisterModal(false)]}
        >
          Iniciar sessão
        </button>
      </div>
    </aside>
  )
}
