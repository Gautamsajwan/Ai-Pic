import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomPrompt } from '../utils'
import { FormField } from '../components'
import { toast } from 'react-toastify'
import previewImg from '../assets/preview.png'
import Lottie from 'lottie-react';
import animation1 from '../lotties/Animation1.json'
import animation4 from '../lotties/Animation4.json'

type Props = {}

function CreatePost({}: Props) {
  useEffect(() => {
    const verifyUser = async() => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/checkLoginStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })

        const result = await response.json()

        if(!result.success) {
          toast.error(result.message)
          navigate('/login')
          return
        }
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    verifyUser()
  }, [])
  
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }

  const generateImage = async() => {
    if(!form.prompt) {
      return toast.error('please provide a valid prompt');
    }
    try {
      setGeneratingImg(true)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/dalle/generateImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: form.prompt
        }),
      })
      const result = await response.json()
      if(!result.success) {
        return toast.error(result.message)
      }
      setForm({...form, photo: `data:image/jpeg;base64,${result.photo}`})
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setGeneratingImg(false);
    }
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => { // contains the logic for sharing the post to the community page
    e.preventDefault()

    if(!form.prompt || !form.photo) {
      return toast.error('please generate an image with a valid prompt')
    }

    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post/createPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({...form})
      })
      const result = await response.json()

      if(!result.success) {
        return toast.error(result.msg)
      } else {
        toast.success('image shared with community')
      }
      navigate('/')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='min-h-[80vh] font-montserrat max-w-7xl mx-auto px-4 py-3'>
      <div>
        <h1 className='font-bold font-spacemono drop-shadow-lg text-4xl md:text-5xl mt-5 mb-2'>Create</h1>
        <p className='text-[#50565c] text-sm font-medium max-w-[700px] bg-gray-200 rounded-md px-3 py-1'>Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <div className='p-5 rounded-lg bg-[rgb(236,236,238)] flex gap-4 mt-10 mb-5 items-stretch'>
        <div className='hidden md:block w-[50%] md:w-[40%] lg:w-[34%] xl:w-[27%] rounded-md overflow-hidden'>
          <Lottie animationData={animation4} className="w-full h-full" loop={true} />
        </div>
        <form className='flex-grow' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField 
              labelName='Your Name'
              type='text'
              name='name'
              placeholder='John doe'
              value={form.name}
              handleChange={handleChange}
            />
            <FormField 
              labelName='Prompt'
              type='text'
              name='prompt'
              placeholder='an oil painting by Matisse of a humanoid robot playing chess'
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe={true}
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className='w-full sm:w-72 aspect-square relative bg-gray-50 border-[5px] border-gray-300 rounded-xl overflow-hidden focus:ring-blue-500 focus:border-blue-500 flex justify-center items-center'>
              { form.photo ? (
                <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
              ): (
                <img src={previewImg} alt="preview" className='w-8/12 h-8/12 object-contain opacity-40'/>
              )}

              { generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-black/60 rounded-lg'>
                  <Lottie animationData={animation1}/>
                </div>
              )}
            </div>
          </div>

          <div className='mt-5 flex flex-col gap-4 sm:flex-row w-full'>
            <button type="button" onClick={generateImage} className='text-white bg-green-600 font-semibold tracking-wide rounded-md text-md w-full px-3 py-2.5 text-center'>
              {generatingImg ? 'Generating' : 'Generate'}
            </button>
            <button type="submit" className='text-white bg-[#6469ff] font-semibold tracking-wide rounded-md text-md w-full px-3 py-2.5 text-center'>
              {loading ? 'Sharing...' : 'Share with the community'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePost