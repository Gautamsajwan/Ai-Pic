import logo from '../assets/logo2.gif'
import { Link } from 'react-router-dom'
import { NavButton } from '.'

type Props = {}

function Navbar({}: Props) {
  return (
    <nav className='h-[70px] border-b-4 font-montserrat px-3 py-2 flex justify-between items-center z-20'>
      <Link to='/'>
        <div className='h-full flex justify-center items-center cursor-pointer'>
          <img className='w-[58px] h-[44px] border-[5px] border-black object-cover rounded-l-full' src={logo} alt="logo" />
          <h1 className='font-bold text-white bg-black pl-1 pr-3 py-2 text-lg rounded-r-full'>AiPic</h1>
        </div>
      </Link>

      <div className='flex gap-3'>
        <Link to='/create-post'> <NavButton title='CreatePost'/> </Link>
        {/* <Link to='/signUp'> <NavButton title='Sign in'/> </Link> */}
      </div>
    </nav>
  )
}

export default Navbar