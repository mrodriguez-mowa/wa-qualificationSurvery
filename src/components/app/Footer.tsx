import { useState, Fragment, useEffect } from 'react'
import Modal from './modal/Modal'


const Footer = () => {

  const [isOpen, setIsOpen] = useState(false)
  
  const handleModal = (value:boolean) =>{
    setIsOpen(value);
  }

  return (
    <>

      <Modal open={handleModal} initial={isOpen} />

      <div className='relative py-10 min-h-auto w-full'>

        <div className='absolute cursor-pointer left-0 bottom-0 flex flex-row md:flex-col items-center justify-around w-full md:w-60 bg-dark-primary py-3 text-gray-100 rounded-none md:rounded-r-lg' onClick={() => {
            setIsOpen(!isOpen)
          }}>
          
            <h1 className="text-sm">Recuerda las tipificaciones</h1>
            <span className='text-sm font-semibold text-primary'>Haz click aquí</span>
          
        </div>

      </div>

    </>

  )
}

export default Footer