import Link from "next/link"
import React from "react"

const AuthLayout = () => {
  return (
    <div className="w-full h-screen text-sm flex flex-col justify-center items-center">
      <div className="flex justify-between flex-col md:flex-row w-full h-full">
        <div className="w-8/12 bg-light-white hidden md:flex flex-col justify-center items-center">
          <img className="h-auto w-6/12" src="/assets/mowito.jpg" alt="login_img" />
        </div>
        <h2 className="w-full bg-dark-primary md:w-4/12 h-full flex flex-col items-center justify-center">
          <img className="h-20" src="/assets/mowa_logo.png" alt="logo_mowa" />
          <>
            <div className="w-full text-light-white my-4 max-w-xs">
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

            </div>
          </>
          <button className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Iniciar Sesión</button>
          <Link className="text-sm underline underline-offset-8 hover:opacity-90 text-light-white" href="/#">¿No tienes cuenta?</Link>
        </h2>
      </div>
    </div>
  )
}

export default AuthLayout