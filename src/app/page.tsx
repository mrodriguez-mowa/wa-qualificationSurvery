"use client";

import Image from "next/image";
import Header from "@/components/app/Header";
import { JSX, SVGProps, useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import Footer from "@/components/app/Footer";


export default function Home() {
  const [type, setType] = useState("");

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
          <div className="text-center">
            <button className="bg-sky-100 text-sky-900 py-2 rounded-lg w-10/12 my-4 md:w-6/12  font-medium shadow-md text-sm ">Siguiente</button>
          </div>

        </div>
        
      </div>
      <Footer />
    </main>
  );
}
