"use client"

import Header from '@/components/app/Header'
import { AuthHOC } from '@/components/auth/AuthHOC'
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {

    const getReportsToday = async () => {
        const id = localStorage.getItem("userId")
        const data = {
            id
        }
        const res = await axios.post("/api/reports/", data);
        console.log(res.data)
    }

    useEffect(()=>{
        getReportsToday()
    }, [])

    return (
        <AuthHOC>
            <div className="w-full h-screen min-h-screen bg-light-white">
                <div className="container items-center justify-center mx-auto min-h-full ">
                    <Header title='Mi progreso' />
                </div>
            </div>
        </AuthHOC>
    )
}

export default page