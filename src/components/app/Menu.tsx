import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function Example() {
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  const logoutFn = () => {
    dispatch(logout());
    push("/auth");
  };

  /*
  const redirectSite = (site: string) => {
    alert('xddd')
    //push(`/${site}`);
  };
  */

  return (
    <div className="absolute  right-0 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">

              <Menu.Item>
                {() => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      logoutFn()
                    }}
                    className="hover:bg-sky-500 hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  >
                    <DuplicateInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
              {/*
              <Menu.Item>
                {() => (
                  <button className="hover:bg-sky-500 hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    <DuplicateInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Mi progreso
                  </button>
                )}
              </Menu.Item>
              */}

            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#00ADB5"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#00ADB5"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4H12V12H4V4Z" fill="#00ADB5" stroke="#EEE" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#00ADB5" stroke="#EEE" strokeWidth="2" />
    </svg>
  );
}
