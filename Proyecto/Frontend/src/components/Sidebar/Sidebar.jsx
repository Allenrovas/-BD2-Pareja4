import React, { useEffect, useState } from "react";
import { FaUserLarge, FaUserLargeSlash } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { FaDochub } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userCtx/User";
import Service from "../../Service/Service";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("")
  const { logged, setLogged } = useUser();
  useEffect(() => {
    console.log(logged);
    if (logged) {
      const user = JSON.parse(localStorage.getItem("data_user"));
      console.log(localStorage.getItem("data_user"));
      setUserName(user.name);
    
      setIsAdmin(user.rol == 1);
    }
  }, [logged]);
  const Menus = [
    {
      name: "Publicaciones",
      icon: <FaDochub className="text-3xl" />,
      path: "/user/home",
    },
    {
      name: "Mi Perfil",
      icon: <FaUserLarge className="text-3xl" />,
      path: "/user/myprofile",
    },
    {
      name: "Mis Amigos",
      icon: <FaUserFriends className="text-3xl" />,
      path: "/user/friends",
    },
    {
      name: "Añadir Amigos",
      icon: <IoPersonAddSharp className="text-3xl" />,
      path: "/user/AddFriends",
    },
    {
        name: "Mensajes",
        icon: <BiSolidMessageSquareDetail className="text-3xl" />,
        path: "/user/history",
    },
    {
        name: "Consultar Pacientes",
        icon: <MdOutlineContentPasteSearch className="text-3xl" />,
        path: "/user/history",
    },
  ];
  const MenuAdmin = [
    {
      name: "Home",
      icon: <IoIosHome className="text-3xl" />,
      path: "/user/home",
    },
    {
      name: "Administración de Libros",
      icon: <GiBookshelf className="text-3xl" />,
      path: "/user/AdminLibros",
    },
    {
      name: "Eliminar Usuarios",
      icon: <FaUserLargeSlash className="text-3xl" />,
      path: "/user/AdminUsers",
    },
    {
      name: "Mi Perfil",
      icon: <FaUserLarge className="text-3xl" />,
      path: "/user/myprofile",
    },
  ];
  const navigate = useNavigate();

  const handlerGoTo = (path) => {
    navigate(path);
  };

  const handlerLogout = () => {
    localStorage.removeItem("data_user");
    setLogged(false);
    navigate("/");
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-rojo2 relative`}
      >
        <img
          src="https://png.pngtree.com/png-vector/20190423/ourlarge/pngtree-left-direction-arrow-icon-png-image_971494.jpg"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-rojo2 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mb-9">
        

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer duration-500 w-14 h-14 text-white ${
                open && "rotate-[360deg]"
              }`}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M9 14.2354V17.0001C9 19.0504 10.2341 20.8125 12 21.584M14.8824 22.0001C16.7691 22.0001 18.3595 20.7311 18.8465 19.0001"
                stroke="#C6C6C6"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M12.2857 3H12.3774C12.6902 3 12.8467 3 12.9785 3.01166C14.4267 3.13972 15.5746 4.28763 15.7026 5.73574C15.7143 5.86761 15.7143 6.02404 15.7143 6.3369V7.23529C15.7143 8.2172 15.5121 9.15189 15.1471 10M5.42857 3H5.3369C5.02404 3 4.86761 3 4.73574 3.01166C3.28763 3.13972 2.13972 4.28763 2.01166 5.73574C2 5.86761 2 6.02404 2 6.3369V7.521C2 11.2292 5.00609 14.2353 8.71429 14.2353C9.78788 14.2353 10.805 13.9936 11.7143 13.5617"
                stroke="#C6C6C6"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <circle
                cx="19"
                cy="16"
                r="3"
                stroke="#C6C6C6"
                stroke-width="1.5"
              ></circle>{" "}
              <path
                d="M12 2V4"
                stroke="#C6C6C6"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M6 2V4"
                stroke="#C6C6C6"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>

          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "hidden"
            }`}
          >
            {userName}
          </h1>
        </div>
        <ul>
          {isAdmin
            ? MenuAdmin.map((item, index) => (
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`}
                  onClick={() => handlerGoTo(item.path)}
                >
                  <div className={`${!open ? "mr-4" : ""}`}>{item.icon}</div>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.name}
                  </span>
                </li>
              ))
            : Menus.map((item, index) => (
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`}
                  onClick={() => handlerGoTo(item.path)}
                >
                  <div className={`${!open ? "mr-4" : ""}`}>{item.icon}</div>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
          <li
            key={isAdmin ? MenuAdmin.length : Menus.length}
            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-rojo1 rounded-md`}
            onClick={handlerLogout}
          >
            <div className={`${!open ? "mr-4" : ""}`}>
              <IoLogOut className="text-3xl" />
            </div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {"Cerrar Sesión"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
