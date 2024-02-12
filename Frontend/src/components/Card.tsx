import { MdOutlineFileDownload } from "react-icons/md"
import { ImQuotesLeft } from "react-icons/im"
import { ImQuotesRight } from "react-icons/im"
import { downloadImage } from '../utils'
import { toast } from "react-toastify"

type Props = {
  _id: string,
  name: string, 
  prompt: string, 
  photo: string
}

function Card({_id, name, prompt, photo}: Props) {
  const handleDownload = () => {
    downloadImage(_id, photo)
    toast.info('Image downloaded successfully')
  }
  return (
    <div className='group relative rounded-xl shadow-card hover:shadow-cardhover overflow-hidden card'>
      <img className='object-cover' src={photo} alt="ai images" />
      
      <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col max-h-[70%] absolute bottom-0 left-0 right-0 rounded-lg bg-[#10131f]/90 m-2 p-3 transition-all ease-in-out duration-300'>
        <p className='text-white text-sm font-[500] overflow-y-auto prompt'><ImQuotesLeft className='text-xs inline mr-1 -translate-y-1'/>{prompt}<ImQuotesRight className='text-xs inline ml-1 -translate-y-1'/></p>

        <div className='mt-3 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-1.5'>
            <div className='w-7 h-7 rounded-full bg-green-600 text-white font-bold flex justify-center items-center pt-[1px] text-sm'>{name[0].toUpperCase()}</div>
            <p className='text-white text-sm bg-inherit font-semibold'>{name}</p>
          </div>

          <button type='button' onClick={handleDownload}><MdOutlineFileDownload className='downloadBtn'/></button>
        </div>
      </div>
    </div>
  )
}

export default Card