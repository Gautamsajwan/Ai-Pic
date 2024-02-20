import logo from '../assets/Mediamodifier-Design.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Model } from '.'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {}

function Navbar({}: Props) {
  const nav = useNavigate();
  const [model, setModel] = useState<boolean>(false)

  const hideModel = () => {
    setModel(false)
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
      <div className='max-w-7xl mx-auto'>
        <div className='h-[70px] px-3 py-2 flex justify-between items-center z-20'>
          <Link to='/'>
            <img className='aspect-[16/9] -ml-3 w-36' src={logo} alt="brand logo" />
          </Link>

          <div className='flex gap-3'>
            <Link to='/create-post'> <button className="navButton">Create post</button> </Link>
            <button onClick={() => setModel(true)} className="navButton">Log out</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar