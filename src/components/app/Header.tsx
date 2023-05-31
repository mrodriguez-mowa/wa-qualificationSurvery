import React from 'react'

interface IHeader {
  title: string
}

const Header = ({ title }: IHeader) => {
  return (
    <div className='flex items-center justify-between flex-col'>
      <img className='h-10' src='https://www.mowa.com.pe/wp-content/uploads/2021/02/logo-mowa-consultora.png'/>
      <h1 className='my-4 text-xl'>{title}</h1>
    </div>
  )
}

export default Header