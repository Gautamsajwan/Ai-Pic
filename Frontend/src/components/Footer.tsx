import logo from '../assets/Mediamodifier-Design.svg'
import { BsLinkedin, BsGithub } from "react-icons/bs"
import { LuGlobe2 } from "react-icons/lu"
import Lottie from 'lottie-react';
import animation2 from '../lotties/Animation2.json'

function Footer() {
  return (
    <section className='p-4 sm:px-7 sm:py-2 bg-[rgb(230,230,230)] outline outline-gray-300 outline-[5px] font-montserrat h-40'>
      <article className='w-full mx-auto max-w-7xl flex justify-between items-center'>
        <div className='flex flex-col'>
            <img className='-ml-5 aspect-[16/9] w-44' src={logo} alt="ai-pic logo" />

            <p className='text-gray-900 text-sm ml-[15px] font-semibold'>Designed by <a className='text-green-600 font-bold' href="https://gautam-portfolio-flax.vercel.app/">Gautam Sajwan</a></p>
        </div>

        <ul className='flex items-center gap-8'>
          <Lottie animationData={animation2} className="h-full" loop={true} />

          <li>
            <a href="https://www.linkedin.com/in/gautam-sajwan-b44179217/"> <BsLinkedin className='text-gray-900 text-4xl' /> </a>
          </li>
          <li>
            <a href="https://github.com/Gautamsajwan"> <BsGithub className='text-gray-900 text-4xl' /> </a>
          </li>
          <li>
            <a href="https://gautam-portfolio-flax.vercel.app/"> <LuGlobe2 className='text-gray-900 text-4xl' /> </a>
          </li>
        </ul>
      </article>
    </section>
  )
}

export default Footer