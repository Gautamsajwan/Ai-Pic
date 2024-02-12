import React from 'react'

type Props = {
    title: string
}

function NavButton({title}: Props) {
  return (
    <button className='navButton'>
        <div className='w-[10px] h-[20px] absolute rotate-45 -top-2 -left-[5px] bg-[#F2FAFF]'></div>
        <div className='w-[10px] h-[20px] absolute rotate-45 -bottom-2 -right-[5px] bg-[#F2FAFF]'></div>
        <span className='bg-transparent'>{title}</span>
    </button>
  )
}

export default NavButton