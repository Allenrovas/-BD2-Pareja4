import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ELIMUsers.css";

export default function ELIMUsers() {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (usuario.rol !== 1) {
      toast.error("No tienes permiso para acceder a esta página.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    }

    const obtData = async () => {
      try {
        let res = await Service.getUsers();
        if (res.status === 200) {
          setUsers(res.data.data);
          console.log("xd: ", res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (usuario.rol === 1) {
      obtData();
    }
    setTimeout(() => {}, 500);

    setResponse("r");
  }, [response]);

  return (
    <div class="h-full w-full overflow-y-auto bg-gradient-to-t from-rojo4 to-rojo2 scrollbar-hide">
      {Users(users, response, setResponse)}
    </div>
  );
}

function Users() {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [showEliminar, setShowEliminar] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (usuario.rol === 1) {
      obtenerDatos();
    }
  }, []);

  const obtenerDatos = async () => {
    try {
      let res = await Service.getUsers();
      if (res.status === 200) {
        setData(res.data.data);
        console.log("xd: ", res.data.data);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    role: 0,
    rentedBooks: [],
    purchasedBooks: [],
  });

  const openModal = async (opcion, id) => {
    // 1 = Eliminar
    try {
      let res = await Service.getUser(id);
      if (res.status === 200) {
        setUserData(res.data.data);
        setIdUser(id);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }

    if (opcion === 1) {
      // Eliminar
      setTitle("Eliminar Usuario");
      setShowEliminar(true);
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    try {
      if (userData.role === 1) {
        toast.error("No se puede eliminar un administrador.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowEliminar(false);
        setTimeout(() => {
          window.location.reload();
          setResponse("eli");
        }, 750);
        return;
      }

      let res = await Service.deleteUser(idUser);
      if (res.status === 200) {
        toast.success("El usuario ha sido eliminado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setShowEliminar(false);
        setTimeout(() => {
          window.location.reload();
          setResponse("eli");
        }, 750);
      } else {
        toast.error("Error al eliminar usuario");
      }
    } catch (e) {
      toast.error("El usuario no ha podido ser eliminado.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setShowEliminar(false);
      setTimeout(() => {
        window.location.reload();
        setResponse("eli");
      }, 750);
    }
  };

  return (
      <div class="flex h-screen ">
        <Toaster />
        <Sidebar />
        <div class="m-auto content-center">
          <section className="flex items-end h-50 text-white p-8 ">
            <div class="md:flex md:items-center place-content-between ltr:ml-3 rtl:mr-3">
              <h1 className="md:w-flex text-2xl xl:text-5xl font-bold ">
                Gestión de Usuarios
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 ms-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </div>
          </section>
          <div class=" bg-gradient-to-t from-gris3 to-gris2 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:auto ">
                <form class="flex space-x-4 items-center">
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-white dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-black dark:text-white">
                <tr>
                  <th scope="col" class="px-6 py-3 ">
                    Nombre
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Numero
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((value) => (
                  <tr class="border-b dark:bg-gris3 dark:border-black hover:bg-black dark:hover:bg-black">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {value.name + " " + value.lastName}
                    </th>

                    <td class="px-6 py-4">{value.phone}</td>
                    <td class="px-6 py-4">{value.email}</td>
                    <td class="px-6 py-4 text-right">
                      <button
                        class="bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal(1, value._id)}
                      >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODAL ELIMINAR */}
          {showEliminar ? (
            <>
              <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className=" relative w-7/12 my-6 mx-auto">
                  {/*content*/}
                  <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-gris3 outline-silver border-black/75">
                    {/*header*/}
                    <div className=" flex text-white items-start justify-between p-5 border-b border-solid border-purple rounded-t">
                      <h3 className="text-2xl font-semibold">{title}</h3>
                      <button
                        className="p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                          setShowEliminar(false);
                        }}
                      >
                        <span className=" text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 22 22"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto text-center">
                      <h1 class="inline-block text-xl md:w-flex text-white py-5">
                        ¿Está seguro de querer eliminar al usuario{" "}
                        <span class="inline-block text-xl text-red-500 font-bold">
                          {" "}
                          {userData.name + " " + userData.lastName}
                        </span>
                        ?
                      </h1>{" "}
                    </div>
                    <form
                      className="justify-center flex"
                      onSubmit={(e) => handleEliminar(e)}
                    >
                      <button
                        type="submit"
                        className="text-white flex ml-4 bg-gradient-to-br from-red-900 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                      >
                        Eliminar
                      </button>
                    </form>

                    {/*footer*/}

                    <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowEliminar(false);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
   
  );
}
