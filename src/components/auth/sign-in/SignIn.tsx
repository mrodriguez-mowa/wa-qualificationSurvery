import Link from "next/link"
import React from "react"

interface ISignIn {
  changeForm: (value:boolean) => void;
}

const SignIn = ({changeForm}:ISignIn) => {
  return (
    <>

      <div className="w-11/12 max-w-lg text-light-white my-4 ">
        <form className="bg-light-dark shadow-md rounded px-8 pt-8 pb-6 mb-4">
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Usuario:
            </label>
            <input className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="user@example.com" />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="password">
              Contraseña:
            </label>
            <input className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="******************" />
          </div>
        </form>

        <div className="flex flex-col justify-center">
          <button className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Iniciar Sesión</button>
          <p onClick={()=>changeForm(false)} className="text-sm text-center underline mx-a underline-offset-8 my-4 cursor-pointer hover:opacity-90 text-light-white">¿No tienes cuenta?</p>

        </div>


      </div>





    </>
  )
}

export default SignIn