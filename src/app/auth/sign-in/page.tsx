import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-dark-primary radiant-bg'>
      <form className='flex flex-col items-center bg-gray-400 p-10 rounded-lg shadow-md text-white justify-center'>
        <h1>Logo</h1>
        <div className='mb-6 mt-4'>
          <label htmlFor="">Usuario:</label> <br />
          <input className='my-3'  type="text" />
        </div>
        <div>
          <label htmlFor="">Contraseña:</label> <br />
          <input className='my-3' type="text" />
        </div>

        <button className='my-10 bg-gray-200 text-gray-700 font-semibold hover:opacity-80 transition-all w-full py-2 rounded-lg'>Iniciar Sesión</button>
        <Link href="/auth/sign-up" className='text-sm underline underline-offset-8'>¿No tienes cuenta?</Link>
      </form>
    </div>
  )
}

export default Page