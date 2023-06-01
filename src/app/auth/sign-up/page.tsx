import React from "react"
import Link from "next/link"

const SignUp = () => {
  return (
    <form className="w-full  text-light-white py-10 max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
            Nombres:
          </label>
          <input className="appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-last-name">
            Primer Apellido:
          </label>
          <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-password">
            Contraseña:
          </label>
          <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
          <p className="text-gray-600 text-xs italic">Nota: Procura no olvidarla</p>
        </div>
      </div>
      
      <div  className="flex flex-col"> 
      <button className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Iniciar Sesión</button>
      <Link className="text-sm text-center underline underline-offset-8 hover:opacity-90 text-light-white" href="/#">¿No tienes cuenta?</Link>

      </div>
      

    </form>
  )
}

export default SignUp