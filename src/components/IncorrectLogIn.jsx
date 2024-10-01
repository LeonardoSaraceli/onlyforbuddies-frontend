import { HiOutlineXMark } from 'react-icons/hi2'
import '../assets/styles/IncorrectFormModal.css'
import { useContext } from 'react'
import { AppContext } from './App'

export default function IncorrectLogIn() {
  const { setNotFoundError } = useContext(AppContext)

  return (
    <section id="incorrect-login">
      <HiOutlineXMark onClick={() => setNotFoundError(false)} />

      <div>
        <span>
          A combinação de utilizador e palavra-passe não está correta.
        </span>

        <button onClick={() => setNotFoundError(false)}>Aceitar</button>
      </div>
    </section>
  )
}
