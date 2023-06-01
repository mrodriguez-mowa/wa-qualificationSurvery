import Link from "next/link"
import React from "react"

const SignIn = () => {
  return (
    <>

      <div className="w-full max-w-lg text-light-white my-4 ">
        <form className="bg-light-dark shadow-md rounded px-8 pt-8 pb-6 mb-4">
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="user@example.com" />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
          </div>
        </form>

        <div className="flex flex-col justify-center">
          <button className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Iniciar Sesión</button>
          <Link className="text-sm text-center underline mx-a underline-offset-8 hover:opacity-90 text-light-white" href="/#">¿No tienes cuenta?</Link>

        </div>


      </div>





    </>
  )
}

export default SignIn