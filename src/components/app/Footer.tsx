import { useState, Fragment } from 'react'


const Footer = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>

      <div className='relative w-full min-h-[70px]'>

        <div className='absolute left-0 bottom-0 flex items-center justify-around w-60 bg-sky-400 py-3 text-gray-100 rounded-r-lg'>
          <div className='hover:cursor-pointer' onClick={() => {
            setIsOpen(!open)
          }}>
            <h1>¿Necesitas Ayuda?</h1>
            <span className='text-sm'>Haz click aquí</span>
          </div>
        </div>

      </div>

    </>

  )
}

export default Footer