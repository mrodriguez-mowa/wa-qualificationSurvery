import Link from "next/link"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"

import { signInOK } from "@/redux/slice/authSlice"

interface ISignIn {
  changeForm: (value: boolean) => void;
}

export interface ISignInForm {
  username: string,
  password: string
}

const SignIn = ({ changeForm }: ISignIn) => {

  const dispatch: AppDispatch = useDispatch()

  const { isAuth } = useSelector((state: RootState) => state.auth)

  const [data, setData] = useState<ISignInForm>({
    username: "",
    password: ""
  })

  const { push } = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(isAuth)

  useEffect(() => {
    if (isAuthenticated) {
      
      push("/")
    } else {
      dispatch(signInOK({
        isAuth: false,
        user: ""
      }))
      push("/auth")
    }
  }, [isAuthenticated])

  const handleInputChange = ({ id, value }: { id: any, value: any }) => {
    setData((prev) => {
      return ({
        ...prev,
        [id]: value
      })
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const response = axios.post('/api/auth/sign-in', data)

    toast.promise(response, {
      loading: "Cargando...",
      success: (res) => {
        dispatch(signInOK({
          isAuth: true,
          user: `${res.data.values.id}`
        }))
        setIsAuthenticated(true)
        return `${res.data.message}`
      },
      error: () => {
        dispatch(signInOK({
          isAuth: true,
          user: ""
        }))
        setIsAuthenticated(false)
        return `¡Ups! Error inesperado`
      }
    }, {
      success: {
        icon: "🤖"
      }
    })
  }

  return (
    <>
      <form onSubmit={(e: React.ChangeEvent<any>) => {
        handleSubmit(e)
      }} className="w-11/12 max-w-lg text-light-white my-4 ">
        <div className="bg-light-dark shadow-md rounded px-8 pt-8 pb-6 mb-4">
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Usuario:
            </label>
            <input onChange={(e: React.ChangeEvent<any>) => {
              handleInputChange(e.target)
            }} value={data.username} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="user@example.com" />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="password">
              Contraseña:
            </label>
            <input onChange={(e: React.ChangeEvent<any>) => {
              handleInputChange(e.target)
            }} value={data.password} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="******************" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <button type="submit" className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Iniciar Sesión</button>
          <p onClick={() => changeForm(false)} className="text-sm text-center underline mx-a underline-offset-8 my-4 cursor-pointer hover:opacity-90 text-light-white">¿No tienes cuenta?</p>

        </div>


      </form>





    </>
  )
}

export default SignIn