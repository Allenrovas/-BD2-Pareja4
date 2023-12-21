import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CRUDLibros.css";

export default function CRUDLibros() {
  const [books, setBooks] = useState([]);
  const [response, setResponse] = useState("");
  const usuario = JSON.parse(localStorage.getItem("data_user"));
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
        let res = await Service.getAllBooks();
        if (res.status === 200) {
          setBooks(res.data.data);
          console.log("xd: ", res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    obtData();

    setTimeout(() => {}, 500);

    setResponse("r");
  }, [response]);

  return (
    <div class="h-full w-full overflow-y-auto bg-gradient-to-t from-rojo4 to-rojo2 scrollbar-hide">
      {Libros(books, response, setResponse)}
    </div>
  );
}

function Libros(books, response, setResponse) {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  useEffect(() => {
    if (usuario.rol === 1) {
      obtenerDatos();
    }
  }, []);

  const [showActualizar, setShowActualizar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [showAgregar, setShowAgregar] = useState(false);

  const [idBook, setIdBook] = useState("");

  const [title, setTitle] = useState("");

  const [data, setData] = useState([]);

  const [libroData, setLibroData] = useState({
    _id: "",
    title: "",
    synopsis: "",
    purchasePrice: 0,
    rentalPrice: 0,
    returnDate: "",
    author: "",
    editorial: "",
    bookState: 0,
    yearDate: 0,
  });

  const obtenerDatos = async () => {
    try {
      let res = await Service.getAllBooks();
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

  const handleInputChange = (event) => {
    setLibroData({
      ...libroData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      let res = await Service.createBook(libroData);
      if (res.status === 200) {
        console.log("Libro creado");
        toast.success("Su libro ha sido creado.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowAgregar(false);
        setTimeout(() => {
          window.location.reload();
          setResponse("guardar");
        }, 750);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let res = await Service.updateBook(libroData._id, libroData);
      if (res.status === 200) {
        console.log("Libro actualizado");
        toast.success("Su libro ha sido actualizado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowActualizar(false);
        setTimeout(() => {
          window.location.reload();
          setResponse("act");
        }, 750);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      let res = await Service.deleteBook(libroData._id);
      if (res.status === 200) {
        console.log("Libro eliminado");
        toast.success("Su libro ha sido eliminado correctamente.", {
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
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = async (opcion, id) => {
    // 1 = Actualizar
    // 2 = Eliminar
    // 3 = Detalle
    // 4 = Agregar Libro
    if (opcion != 4) {
      try {
        let res = await Service.getBook(id);
        if (res.status === 200) {
          setLibroData(res.data.data);
          console.log("DATA OBTENIDA: ", res.data.data);
        } else {
          console.log("error");
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (opcion === 1) {
      // Actualizar
      console.log("id: ", id);
      setTitle("Actualizar Libro");
      setShowActualizar(true);
    } else if (opcion === 2) {
      // Eliminar
      console.log("id: ", id);
      setTitle("Eliminar Libro");
      setShowEliminar(true);
    } else if (opcion === 3) {
      // Detalle
      console.log("id: ", id);
      setTitle("Detalle Libro");
      setShowDetalle(true);
    } else if (opcion === 4) {
      // Agregar
      console.log("id: ", id);
      setTitle("Agregar Libro");
      setShowAgregar(true);
    }
  };

  return (
    <div class="flex h-screen">
      <Sidebar />
      <Toaster />
      <div class="m-auto content-center">
        <section className="flex items-end h-50 text-white p-8 ">
          <div class="md:flex md:items-center place-content-between ltr:ml-3 rtl:mr-3">
            <h1 className="md:w-flex text-2xl xl:text-5xl font-bold ">
              Gestión de Libros
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
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
                <div class="w-full md:w-auto  space-y-2 md:space-y-0  flex-shrink-0">
                  <button
                    type="button"
                    className="flex  text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg  text-sm px-4 py-2 dark:bg-yellow-500 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={() => openModal(4)}
                  >
                    <svg
                      class="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewbox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Agregar Libro
                  </button>
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
                  Título
                </th>
                <th scope="col" class="px-6 py-3">
                  Autor
                </th>
                <th scope="col" class="px-6 py-3">
                  Actualizar
                </th>
                <th scope="col" class="px-6 py-3">
                  Eliminar
                </th>
                <th scope="col" class="px-6 py-3">
                  Detalle
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
                    {value.title}
                  </th>

                  <td class="px-6 py-4">{value.author}</td>
                  <td class=" text-center">
                    <button
                      class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded "
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </td>

                  <td class="px-6 py-4 text-right">
                    <button
                      class="bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openModal(2, value._id)}
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

                  <td class="px-6 py-4 text-right">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openModal(3, value._id)}
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
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL ACTUALIZAR */}

        {showActualizar ? (
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
                        setShowActualizar(false);
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

                  <form
                    onSubmit={(e) => {
                      handleUpdate(e);
                    }}
                  >
                    <div className="relative p-6 flex-auto">
                      <div class="w-full ">
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Título:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="title"
                              defaultValue={libroData.title}
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Autor:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="author"
                              defaultValue={libroData.author}
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>

                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Editorial:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="editorial"
                              defaultValue={libroData.editorial}
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>

                        <div className="columns-3 gap-1">
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Venta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="purchasePrice"
                                defaultValue={libroData.purchasePrice}
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Renta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="rentalPrice"
                                defaultValue={libroData.rentalPrice}
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Año publicación:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="yearDate"
                                defaultValue={libroData.yearDate}
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                          for="inline-full-name"
                        >
                          Sinopsis:
                        </label>
                        <div class="md:flex md:items-center mb-6">
                          <div class=""></div>
                          <div class="w-full ">
                            <textarea
                              class="bg-gray-200 appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="synopsis"
                              defaultValue={libroData.synopsis}
                              onChange={handleInputChange}
                              required={true}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  </form>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowActualizar(false);
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
                      ¿Está seguro de querer eliminar el libro{" "}
                      <span class="inline-block text-xl text-red-500 font-bold">
                        {" "}
                        {libroData.title}
                      </span>
                      ?
                    </h1>{" "}
                  </div>
                  <form
                    className="justify-center flex"
                    onSubmit={(e) => {
                      handleDelete(e);
                    }}
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

        {/* MODAL DETALLE */}
        {showDetalle ? (
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
                        setShowDetalle(false);
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

                  <form>
                    <div className="relative p-6 flex-auto">
                      <div class="w-full ">
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Título:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="nombre"
                              readOnly={true}
                              defaultValue={libroData.title}
                            ></input>
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Autor:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="nombre"
                              readOnly={true}
                              defaultValue={libroData.author}
                            ></input>
                          </div>
                        </div>

                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Editorial:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="nombre"
                              readOnly={true}
                              defaultValue={libroData.editorial}
                            ></input>
                          </div>
                        </div>

                        <div className="columns-3 gap-1">
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Venta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                name="nombre"
                                readOnly={true}
                                defaultValue={libroData.purchasePrice}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Renta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                name="nombre"
                                readOnly={true}
                                defaultValue={libroData.rentalPrice}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Año publicación:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                name="yearDate"
                                defaultValue={libroData.yearDate}
                                readOnly={true}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                          for="inline-full-name"
                        >
                          Sinopsis:
                        </label>
                        <div class="md:flex md:items-center mb-6">
                          <div class=""></div>
                          <div class="w-full ">
                            <textarea
                              class="bg-gray-200 appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="descripcion"
                              readOnly={true}
                              defaultValue={libroData.synopsis}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowDetalle(false);
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

        {/* MODAL AGREGAR */}
        {showAgregar ? (
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
                        setShowAgregar(false);
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

                  <form
                    onSubmit={(e) => {
                      handleCreate(e);
                    }}
                  >
                    <div className="relative p-6 flex-auto">
                      <div class="w-full ">
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Título:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="title"
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Autor:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="author"
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>

                        <div class="md:flex md:items-center mb-6">
                          <div class="">
                            <label
                              class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              for="inline-full-name"
                            >
                              Editorial:
                            </label>
                          </div>
                          <div class="w-full mr-[250px]">
                            <input
                              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="editorial"
                              onChange={handleInputChange}
                              required={true}
                            ></input>
                          </div>
                        </div>

                        <div className="columns-3 gap-1">
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Venta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="purchasePrice"
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Precio Renta:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="rentalPrice"
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                          <div class="md:flex md:items-center mb-6">
                            <div class="">
                              <label
                                class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                                for="inline-full-name"
                              >
                                Año publicación:
                              </label>
                            </div>
                            <div class="w-full mr-[50px]">
                              <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="number"
                                name="yearDate"
                                onChange={handleInputChange}
                                required={true}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                          for="inline-full-name"
                        >
                          Sinopsis:
                        </label>
                        <div class="md:flex md:items-center mb-6">
                          <div class=""></div>
                          <div class="w-full ">
                            <textarea
                              class="bg-gray-200 appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="synopsis"
                              onChange={handleInputChange}
                              required={true}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  </form>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowAgregar(false);
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
