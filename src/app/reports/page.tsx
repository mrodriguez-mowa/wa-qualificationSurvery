"use client"

import Header from '@/components/app/Header'
import { AuthHOC } from '@/components/auth/AuthHOC'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [data, setData] = useState<any>(null)

    const getReportsToday = async () => {
        const id = localStorage.getItem("userId")
        const data = {
            id
        }
        const res = await axios.post("/api/reports/", data);
        // console.log(res.data)
        setData(res.data.values)
        console.log(res.data.values)
    }

    useEffect(() => {
        
        getReportsToday()
    }, [])

    return (
        <AuthHOC>
            <div className="w-full h-screen min-h-screen bg-light-white">
                <div className="container items-center justify-center mx-auto min-h-full ">
                    {data ? (
                        <>
                            <Header title={`Tu progreso, ${data.name} ${data.lastname}`} />

                            <div className='flex my-4 md:flex-row flex-col-reverse justify-center md:justify-around  w-full'>
                                <div className='bg-gray-300 my-5 shadow-md justify-around items-center flex w-10/12 mx-auto  md:w-3/12 py-5 rounded-lg'>
                                    <span className='rounded-full text-gray-300 px-2 py-2 bg-gray-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </span>
                                    <div>
                                        <p className='text-gray-500 text-sm'> Mensajes calificados ayer </p>
                                        <p className='text-gray-700 font-semibold text-xl'>{data.classified_yesterday}</p>
                                    </div>
                                </div>

                                <div className='bg-sky-300 relative shadow-md justify-around items-center flex w-10/12 mx-auto md:w-3/12 py-5 rounded-lg'>
                                    <span className='rounded-full text-gray-300 px-2 py-2 bg-sky-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EEEE" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>


                                    </span>
                                    
                                    <span className={`absolute -right-5 rounded-full p-2 font-semibold shadow-md -top-5 ${data.classified_today/data.classified_yesterday>1 ? 'bg-green-300 text-green-600': 'bg-red-300 text-red-600' }`}>
                                        {(data.classified_today/data.classified_yesterday) * 100 } % {data.classified_today > data.classified_yesterday ? '-' : '+' }
                                    </span>
                                    <div>
                                        <p className='text-sky-500 text-sm'> Mensajes calificados hoy </p>
                                        <p className='text-sky-800 font-semibold text-xl'>{data.classified_today}</p>
                                    </div>
                                </div>
                            </div>
                        </>

                    ) : null}
                </div>
            </div>
        </AuthHOC>
    )
}

export default page