import React, { useEffect, useState } from "react";
import { FaUserLarge, FaUserLargeSlash } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { PiBookBookmarkFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userCtx/User";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { logged, setLogged } = useUser();
    useEffect(() => {
        console.log(logged);
        if (logged) {
          const user = JSON.parse(localStorage.getItem("data_user"));
          console.log(localStorage.getItem('data_user'));
          setIsAdmin(user.rol == 1);
        }
    }, [logged]);
    const Menus = [
        {
            name: "Home",
            icon: <IoIosHome className="text-3xl"/>,
            path: "/user/home",
        },
        {
            name: "Mis Libros",
            icon: <PiBookBookmarkFill className="text-3xl"/>,
            path: "/user/mybooks",
        },
        {
            name: "Historial",
            icon: <MdOutlineHistory className="text-3xl"/>,
            path: "/user/history",
        },
        {
            name: "Mi Perfil",
            icon: <FaUserLarge className="text-3xl"/>,
            path: "/user/myprofile",
        }
    ]
    const MenuAdmin = [
        {
            name: "Home",
            icon: <IoIosHome className="text-3xl"/>,
            path: "/user/home",
        },
        {
            name: "Administración de Libros",
            icon: <GiBookshelf className="text-3xl"/>,
            path: "/user/AdminLibros",
        },
        {
            name: "Eliminar Usuarios",
            icon: <FaUserLargeSlash className="text-3xl"/>,
            path: "/user/AdminUsers",
        },
        {
            name: "Mi Perfil",
            icon: <FaUserLarge className="text-3xl"/>,
            path: "/user/myprofile",
        }
    ]
    const navigate = useNavigate();

    const handlerGoTo = (path) => {
        navigate(path);
    }

    const handlerLogout = () => {
        localStorage.removeItem("data_user");
        setLogged(false);
        navigate("/");
    }

    return(
        <div className="flex">
            <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-rojo2 relative`}>
                <img
                    src="https://png.pngtree.com/png-vector/20190423/ourlarge/pngtree-left-direction-arrow-icon-png-image_971494.jpg"
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-rojo2 ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center mb-9">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`cursor-pointer duration-500 w-10 h-10 text-white ${open && "rotate-[360deg]"}`}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                  </svg>
                  <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'hidden'}`}>MyLibrary</h1>
                </div>
                <ul>
                    {isAdmin?MenuAdmin.map((item, index) => (
                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`} onClick={() => handlerGoTo(item.path)}>
                            <div className={`${!open ? 'mr-4' : ''}`}>{item.icon}</div>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.name}</span>
                        </li>
                    )):Menus.map((item, index) => (
                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`} onClick={() => handlerGoTo(item.path)}>
                            <div className={`${!open ? 'mr-4' : ''}`}>{item.icon}</div>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.name}</span>
                        </li>
                    ))}
                    <li key={isAdmin?MenuAdmin.length:Menus.length} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`} onClick={handlerLogout}>
                        <div className={`${!open ? 'mr-4' : ''}`}><IoLogOut className="text-3xl"/></div>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>{"Cerrar Sesión"}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;