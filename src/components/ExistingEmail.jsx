import { HiOutlineXMark } from 'react-icons/hi2'
import '../assets/styles/IncorrectFormModal.css'
import { useContext } from 'react'
import { AppContext } from './App'

export default function ExistingEmail() {
  const { setExistingUniqueFieldError } = useContext(AppContext)

  return (
    <section id="incorrect-form-modal">
      <HiOutlineXMark onClick={() => setExistingUniqueFieldError(false)} />

      <div>
        <span>
          O nome de utilizador especificado já está registrado. Por favor,
          introduza um diferente.
        </span>

        <button onClick={() => setExistingUniqueFieldError(false)}>
          Aceitar
        </button>
      </div>
    </section>
  )
}
