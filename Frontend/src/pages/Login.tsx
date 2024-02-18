import { FormEvent, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import logo from '../assets/Mediamodifier-Design.svg'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigate = useNavigate();

  const handleMouseDown = () => {
    setShowPassword(prev => !prev)
  };

  const handleMouseUp = () => {
    setShowPassword(prev => !prev)
  };

  const handleBack = () => {
    navigate('/signUp')
  }

  const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/verifyUser`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include'
      })
      console.log("respone => ", response);
      const data = await response.json()
      
      if (data.success) {
        navigate("/")
        toast.dismiss();
        toast.success(data.message)
      } else {
        toast.dismiss();
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(`Internal server error: ${error.message}`)
    }
  }

  return (
    <div className="text-white relative w-full h-screen overflow-hidden font-montserrat flex flex-col justify-center items-center">
      <img className="w-44" src={logo} alt="aipic logo" />
      <div className="mt-1 p-8 rounded-lg bg-gray-800/70">
        <form className="flex flex-col gap-2 w-[500px]">
          <label htmlFor="email" className="font-bold pl-1 text-lg">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="textField" placeholder='enter your email' />

          <label htmlFor="password" className="pl-1 font-bold mt-2 text-lg">Password</label>
          <div className="relative flex flex-col">
            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={e => setPassword(e.target.value)} className="textField" placeholder='enter your password' />
            <BsEye onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} className="absolute right-4 text-xl cursor-pointer top-1/2 -translate-y-1/2" />
          </div>

          <div className='flex mt-5 justify-between mx-1 gap-5'>
            <button onClick={handleLogin} className="rounded-lg w-1/2 font-bold py-2 outline outline-white hover:text-gray-900 hover:bg-gray-200 active:scale-95 transition duration-200 ease-in-out">Login</button>
            <button onClick={handleBack} className="rounded-lg w-1/2 font-bold py-2 outline outline-white hover:text-gray-900 hover:bg-gray-200 active:scale-95 transition duration-200 ease-in-out">Back to sign-up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login