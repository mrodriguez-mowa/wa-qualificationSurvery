import React from 'react'
import MenuDropdown from './Menu'

interface IHeader {
  title: string
}

const Header = ({ title }: IHeader) => {
  return (
    <div className='flex mt-4 items-center justify-between flex-col'>
      <div className='relative  w-10/12 min-h-[25px] my-4 md:w-6/12 container'>
        <div className='cursor-pointer' >
          <MenuDropdown />
        </div>
      </div>



      <img className='h-10' src='https://www.mowa.com.pe/wp-content/uploads/2021/02/logo-mowa-consultora.png' />
      <h1 className='my-4'>{title}</h1>
    </div>
  )
}

export default Header