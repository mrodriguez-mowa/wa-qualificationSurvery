"use client";

import Image from "next/image";
import Header from "@/components/app/Header";
import { JSX, SVGProps, useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import Footer from "@/components/app/Footer";
import { Dialog, Transition } from '@headlessui/react'

export default function Home() {
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false)

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
    <main className="w-full h-screen">

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setIsOpen(false)
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      <div className="container flex items-center justify-center mx-auto min-h-full">
        <div className=" w-full">
          <Header title="¿Qué calificación corresponde?" />

          <p className="text-lg py-4 my-6 border-sky-200 border-2 text-sky-700 rounded-lg bg-sky-100 w-10/12 md:w-6/12 mx-auto font-semibold text-center">
            ¿En dónde puedo pagar?
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
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                        : ""
                      }
      ${checked
                        ? "bg-sky-500 bg-opacity-75 text-white font-semibold"
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
          <div className="text-center ">
            <button onClick={()=>{
              console.log('cambiado')
              setIsOpen(!open)
            }} className="bg-green-500 w-10/12 my-4 md:w-6/12 ">Siguiente</button>
          </div>

          <Footer />

        </div>
      </div>

    </main>
  );
}
