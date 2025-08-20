import logo from '../assets/Mediamodifier-Design.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Model } from '.'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaRegCircleUser } from 'react-icons/fa6'

type Props = {}

function Navbar({}: Props) {
  const nav = useNavigate();
  const [model, setModel] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<boolean>(false)

  const toggleMoreOptions = () => {
    setMoreOptions(prev => !prev)
  }

  const hideModel = () => {
    setModel(false)
  }

  const handleProfileClick = () => {
    nav('/my-profile')
    setMoreOptions(false)
  }

  const logoutHandler = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })

      const result = await response.json()

      if(!result.success) {
        return toast.error(result.message)
      }

      toast.info(result.message)
      nav("/login");
    } catch(error: any) {
      toast.error('Internal Server Error: ',error.message)
    } finally {
      hideModel()
    }
  }

  return (
    <nav className='font-montserrat border-b-4'>
      {model && <Model handleYes={logoutHandler} handleNo={hideModel}/>}
      <div className='max-w-7xl mx-auto relative'>
        <div className='h-[70px] px-3 py-2 flex justify-between items-center z-20'>
          <Link to='/'>
            <img className='aspect-[16/9] -ml-3 w-36' src={logo} alt="brand logo" />
          </Link>

          <div className='flex gap-3'>
            <Link to='/create-post'> <button className="navButton">Create post</button> </Link>
            <button onClick={toggleMoreOptions}><FaRegCircleUser className='w-9 h-9 text-gray-800'/></button>
          </div>

          { moreOptions && 
            <div className='mt-2 absolute flex flex-col top-full right-1 p-2.5 rounded-lg shadow-xl outline outline-gray-500 bg-[#F2FAFF] gap-2 z-10'>
              <button onClick={handleProfileClick} className='border-b-4 text-left font-bold border-gray-700 hover:border-[#6469ff] hover:text-[#4144a7]'>My Profile</button>
              <button onClick={() => setModel(true)} className="navButton rounded-md py-2">Log out</button>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar