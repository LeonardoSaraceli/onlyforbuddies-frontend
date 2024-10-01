import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { LuUser2 } from 'react-icons/lu'
import { IoBagOutline } from 'react-icons/io5'
import { FaBarsStaggered } from 'react-icons/fa6'
import logo from '../assets/images/logo.png'
import '../assets/styles/Header.css'
import { useContext } from 'react'
import { AppContext } from './App'

export default function Header() {
  const { setShowSignUpOrSignInModal, setShowLogInModal } =
    useContext(AppContext)

  return (
    <header>
      <figure>
        <FaBarsStaggered />

        <a href="/">
          <img src={logo} alt="Only for buddies logo" />
        </a>
      </figure>

      <ul>
        <li>
          <HiOutlineMagnifyingGlass />

          <span>Pesquisar</span>
        </li>

        <li
          onClick={() => [
            setShowSignUpOrSignInModal(true),
            setShowLogInModal(true),
          ]}
        >
          <LuUser2 />

          <span>Iniciar sessão</span>
        </li>

        <li>
          <IoBagOutline />

          <span>Cesto de compras</span>
        </li>
      </ul>
    </header>
  )
}
