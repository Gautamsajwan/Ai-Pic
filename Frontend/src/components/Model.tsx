import React from 'react'

type props = {
    handleYes: React.EventHandler<React.SyntheticEvent>
    handleNo: React.EventHandler<React.SyntheticEvent>
}

function Model({handleYes, handleNo}: props) {
  return (
    <section onClick={handleNo} className='backdrop-blur-sm backdrop-brightness-90 outline h-screen w-screen top-0 left-0 z-20 fixed flex justify-center items-center'>
        <div className='bg-[rgb(29,32,36)] flex flex-col justify-evenly gap-5 px-7 h-40 rounded-xl'>
            <h1 className='text-white font-bold text-3xl'>Are you sure?</h1>

            <div className='flex justify-between gap-4 mb-2'>
                <button onClick={handleYes} className='outline outline-white hover:outline-green-600 hover:bg-green-500 w-1/2 py-1.5 rounded-md font-bold text-lg text-white'>Yes</button>
                <button onClick={handleNo} className='outline outline-white hover:outline-red-600 hover:bg-red-500 w-1/2 py-1.5 rounded-md font-bold text-lg text-white'>No</button>
            </div>
        </div>
    </section>
  )
}

export default Model