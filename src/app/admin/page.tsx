"use client"

import { AuthHOC } from '@/components/auth/AuthHOC'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Admin = () => {
    const [show, setShow] = useState(false)
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

    return (
        <AuthHOC>{show ? (<main className="w-full h-screen min-h-screen bg-light-white">

        </main>) : null}</AuthHOC>
    )
}

export default Admin