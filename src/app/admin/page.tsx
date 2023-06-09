"use client"

import Header from '@/components/app/Header'
import PieChart from '@/components/app/admin/PieChart'
import { AuthHOC } from '@/components/auth/AuthHOC'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

const Admin = () => {
    const [show, setShow] = useState(false)
    // mensajes calificados 
    const [dataMessages, setDataMessages] = useState<any>([])
    // data usuarios para filtros
    const { push } = useRouter()

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin") == "true"
        if (isAdmin) {
            console.log("Es admin")
        } else {
            push("/")
        }

        setShow(isAdmin)
    }, [])

    useEffect(() => {
        if (show) {
            getClassifiedMessages()
        }
    }, [show])



    const getClassifiedMessages = async () => {
        const data = await axios.get("/api/answers/type?id=all")
        console.log(data.data.values)





        setDataMessages(data.data.values)
    }



    return (
        <AuthHOC>{show ? (<main className="w-full h-screen min-h-screen bg-light-white">
            <Header title='Seguimiento del proyecto' />

            <div className='md:w-8/12 bg-white mx-auto overflow-hidden flex flex-col md:flex-row w-10/12 h-auto rounded-lg shadow-md '>

                <div className='md:w-4/12 w-full flex flex-col justify-center items-center h-full'>
                    <div className='bg-sky-300 min-h-full mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto  py-5 rounded-lg'>
                        <span className='rounded-full text-sky-300 px-2 py-2 bg-sky-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </span>

                        <div>
                            <p className='text-sky-600 text-sm'> Total de mensajes calificados  </p>
                            <p className='text-sky-800 text-center font-semibold text-xl'>{
                                dataMessages.reduce((sum: any, currentValue: any) => {
                                    const total = parseInt(currentValue.total);
                                    return sum + total;
                                }, 0)
                            }</p>
                        </div>
                    </div>
                </div>
                <div className='md:w-8/12 w-full bg-green-500 flex flex-col justify-center items-center h-full'>

                    <div className='w-11/12 grid grid-cols-2 auto-rows-auto'>
                        {dataMessages.map((el:any, idx:number) => {
                            return (
                                <div className='bg-sky-300 mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto  py-5 rounded-lg'>
                                    <span className='rounded-full text-sky-300 px-2 py-2 bg-sky-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </span>

                                    <div>
                                        <p className='text-sky-600 text-sm'> {el.new_type} </p>
                                        <p className='text-sky-800 text-center font-semibold text-xl'>
                                            {el.total}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>










        </main>) : null}</AuthHOC>
    )
}

export default Admin