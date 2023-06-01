import React from 'react'

const Page = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-950'>
      <form className='flex flex-col items-center text-white justify-center'>
        <h1>Logo</h1>
        <div className='mb-6 mt-4'>
          <label htmlFor="">Usuario:</label> <br />
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Contraseña:</label> <br />
          <input type="text" />
        </div>

        <button className='my-10 bg-sky-200 text-sky-700 font-semibold hover:opacity-80 transition-all w-full py-2 rounded-lg'>Enviar</button>
      </form>
    </div>
  )
}

export default Page