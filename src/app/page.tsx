"use client";

import Image from "next/image";
import Header from "@/components/app/Header";
import { JSX, SVGProps, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Footer from "@/components/app/Footer";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { toast } from "react-hot-toast";
import Loader from "@/components/utils/Loader";

import { useRouter } from "next/navigation";
import axios from "axios";
import { setMessageState } from "@/redux/slice/messageSlice";
import { AuthHOC } from "@/components/auth/AuthHOC";


export default function Home() {
  const [type, setType] = useState<any>(null);

  const dispatch: AppDispatch = useDispatch();

  const [message, setMessage] = useState({
    text: "",
    id: "",
  });

  const fetchMessage = async (update: boolean) => {
    const messageLS = localStorage.getItem("messageText");
    const messageId = localStorage.getItem("messageId");

    try {
      if (update) {
        console.log("post actualizacvion");
        const res = await axios.get("/api/messages");

        setType(null);

        setMessage({
          id: res.data.values.id,
          text: res.data.values.message.replace("%20", " "),
        });

        dispatch(
          setMessageState({
            id: res.data.values.id,
            messageText: res.data.values.message.replace("%20", " "),
          })
        );
      } else {
        if (!messageId && !messageLS) {
          console.log("se trajo un mensaje");
          const res = await axios.get("/api/messages");
          setType(null);

          setMessage({
            id: res.data.values.id,
            text: res.data.values.message.replace("%20", " "),
          });

          dispatch(
            setMessageState({
              id: res.data.values.id,
              messageText: res.data.values.message.replace("%20", " "),
            })
          );
        } else {
          console.log("xd");
          setMessage({
            id: messageId || "  ",
            text: messageLS || "  ",
          });
        }
      }
    } catch (error) {
      toast.error("No se pudo traer el mensaje");
    }
  };

  const onClickOption = async (chosenType: any) => {
    // clear previous message
    const userId = localStorage.getItem("userId");
    try {
      await axios.post("/api/messages", {
        id: message.id,
        type: chosenType,
        userId: userId,
      });
      localStorage.removeItem("messageId");
      localStorage.removeItem("messageText");
      await fetchMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const logged = localStorage.getItem("isAuthenticated");
    const authValue = logged == "true";
    if (authValue) {
      fetchMessage(false);
    }
  }, []);

  const options: Array<string> = [
    "Prevención",
    "Compromiso",
    "Renuente",
    "Confirmados",
    "Asesoramiento",
    "Verificación de número",
    "No deseado",
    "No aplica",
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
    <main className="w-full h-screen min-h-screen bg-light-white">

      <AuthHOC>
        <>
          <div className="container  flex items-center justify-center mx-auto min-h-full ">
            <div className=" w-full">
              <Header title="¿Qué calificación corresponde?" />

              <p className="text-lg py-4 px-2 my-6 border-gray-200 border-2 text-gray-700 rounded-lg bg-gray-200 w-10/12 md:w-6/12 mx-auto font-semibold text-center">
                {message.text}
              </p>

              <div>
                <RadioGroup value={type}>
                  {options.map((text, idx) => {
                    return (
                      <RadioGroup.Option
                        key={`radio-${idx}`}
                        value={text}
                        onClick={() => {
                          onClickOption(text)
                        }}
                        className={() =>
                          `hover:bg-dark-primary text-slate-700 hover:text-white hover:bg-opacity-75  bg-white border-2 border-gray-100 font-semibold relative flex cursor-pointer rounded-lg px-5 py-4 my-3 focus:outline-none w-10/12 md:w-6/12 mx-auto`
                        }
                      >
                        {() => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                  >
                                    {text}
                                  </RadioGroup.Label>
                                </div>
                              </div>
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
                  onClick={() => {
                    onClickOption(null);
                  }}
                  type="button"
                  className="bg-primary mx-auto hover:opacity-80 flex flex-row justify-center items-center text-light-white py-2 rounded-lg w-10/12 my-4 md:w-6/12  font-medium shadow-md text-sm disabled:cursor-not-allowed"
                >
                  Omitir
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mx-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>

      </AuthHOC>

    </main>
  );
}
