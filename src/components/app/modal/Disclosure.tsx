import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const DisclosureComp = () => {

    const types = [
        {
            title: "Prevención",
            description: "Indica que denunciará, quejará o tomará medidas legales"
        },
        {
            title: "Compromiso",
            description: "Indica el pago de deuda en una fecha determinada"
        },
        {
            title: "Renuente",
            description: "Indica que no va a realizar el pago por 'x' motivos"
        },
        {
            title: "Confirmados",
            description: "Indica la conformidad que el pago se realizó"
        },
        {
            title: "Asesoramiento",
            description: "Indica dudas o que requiere más información con su deuda. Se incluyen nombres, celulares, fechas, horas y documentos que no están acompañados de más texto"
        },
        {
            title: "Verificar Número",
            description: "Indica que no es, no conoce o que el número no pertenece a la persona en mención"
        },
        {
          title: "No deseado",
          description: "El cliente brinda algún insulto o menciona acoso, hostigamiento, amenaza, estafa y /o extorsión por parte de la empresa"
        },
        {
          title: "No aplica",
          description: "Respuestas que no tengan coherencia o relación con el objetivo de la campaña."
        }
    ]

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white py-2">
        {
            types.map((element,idx)=>{
                return (<Disclosure defaultOpen  key={`disclosure-${idx}`} >
                    {({ open  }:any) => (
                      <div  className="my-2">
                        <Disclosure.Button  className="flex w-full justify-between  rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                          <span>{element.title}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                         {element.description}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>)
            })
        }
        
        
      </div>
    </div>
  );
};

export default DisclosureComp;
