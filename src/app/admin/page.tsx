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

    useEffect(()=>{
        if(show){
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

                <PieChart data={dataMessages} />
            

            {dataMessages.map((el:any, idx:number)=>{
                return(<p key={idx}>
                    {el.new_type} - {el.total}
                </p>)
            })}
        </main>) : null}</AuthHOC>
    )
}

export default Admin