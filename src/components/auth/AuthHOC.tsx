"use client"

import React, { useEffect, useState } from 'react'

import { toast } from "react-hot-toast";
import Loader from "@/components/utils/Loader";

import { useRouter } from "next/navigation";

export const AuthHOC = ({children}: any) => {

    const [isLogged, setIsLogged] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        const logged = localStorage.getItem("isAuthenticated");

        const authValue = logged == "true";

        setIsLogged(authValue);

        if (!authValue) {
            toast.error("Inicia sesión primero");
            setTimeout(() => {
                push("/auth");
            }, 1500);
        }
    }, []);

    return (
        <div className='w-full min-h-screen h-screen'>
            {isLogged ? children : <Loader/>}
        </div>
    )
}
