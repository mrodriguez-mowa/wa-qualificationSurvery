"use client";

import Image from "next/image";
import Header from "@/components/app/Header";
import { JSX, SVGProps, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Footer from "@/components/app/Footer";

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"

import { toast } from "react-hot-toast"
import Loader from "@/components/utils/Loader";

import { useRouter } from "next/navigation"
import axios from "axios";

export default function Home() {
  const [type, setType] = useState(null);

  const { push } = useRouter();

  const { isAuth } = useSelector((state: RootState) => state.auth)
  
  const [message, setMessage] = useState({
    text: "",
    id: 0
  })

  useEffect(() => {
    if (!isAuth) {
      toast.error("Inicia sesión primero")
      setTimeout(()=>{
        push("/auth")
      }, 1500)
    } 
  }, [])

  const fetchMessage = async () => {
    try {
      const res = await axios.get('/api/messages')
      setMessage({
        text: res.data.values.message.replace("%20", " "),
        id: res.data.values.id
      })
      console.log(res)
    } catch (error) {
      toast.error("No se pudo traer el mensaje")
    } 
  }

  useEffect(()=>{
    if (isAuth) {
      fetchMessage()
    }
  }, [])

  const options: Array<string> = [
    "Prevención",
    "Compromiso",
    "Renuente",
    "Confirmados",
    "Asesoramiento",
    "Verificación de número",
    "No deseado",
  ];

  const CheckIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };



  return (
    <main className="w-full h-screen bg-light-white">
      {isAuth ? <><div className="container  flex items-center justify-center mx-auto min-h-full ">
        <form onSubmit={async (e)=>{
          e.preventDefault()
          await fetchMessage()
        }} className=" w-full">
          <Header title="¿Qué calificación corresponde?" />

          <p className="text-lg py-4 px-2 my-6 border-gray-200 border-2 text-gray-700 rounded-lg bg-gray-200 w-10/12 md:w-6/12 mx-auto font-semibold text-center">
            {message.text}
          </p>

          <div>
            <RadioGroup value={type} onChange={setType}>
              {options.map((text, idx) => {
                return (
                  <RadioGroup.Option
                    key={`radio-${idx}`}
                    value={text}
                    className={({ active, checked }) =>
                      `${active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-300"
                        : ""
                      }
      ${checked
                        ? "bg-dark-primary bg-opacity-75 text-white font-semibold"
                        : "bg-white border-2 border-gray-100"
                      }
        relative flex cursor-pointer rounded-lg px-5 py-4 my-3 focus:outline-none w-10/12 md:w-6/12 mx-auto`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={` ${checked ? "text-white font-medium" : " text-slate-700"
                                  }`}
                              >
                                {text}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                );
              })}
            </RadioGroup>

          </div>
          <div className="text-center">
            <button 
            disabled={type == null ? true : false}
            className="bg-primary hover:opacity-80 text-light-white py-2 rounded-lg w-10/12 my-4 md:w-6/12  font-medium shadow-md text-sm disabled:cursor-not-allowed">Siguiente</button>
          </div>

        </form>

      </div>
        <Footer />
      </> : <Loader />}

    </main>
  );
}
