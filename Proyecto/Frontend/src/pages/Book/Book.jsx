import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaBookReader } from "react-icons/fa";
import { MdOutlineAddShoppingCart, MdOutlineSell } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Desencriptar } from "../../utils/main";

const Book = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [yearDate, setYearDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [bookState, setBookState] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const id_user = JSON.parse(localStorage.getItem("data_user")).id;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [data, setData] = useState({
    idBook: "",
    idUser: "",
    comment: "",
  });

  const parseDate = (inputDate) => {
    const fecha = new Date(`${inputDate}T23:59:59.000Z`);
    return fecha.toISOString();
  };

  const handleRentModal = () => {
    setModalOpen(true);
  }
  const handleDateChange = (e) => {
    if(e.target.value){
      setFechaDevolucion(e.target.value);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("DATA");
    console.log(data);

    data.idBook = Desencriptar(id);
    const user = JSON.parse(localStorage.getItem("data_user"));
    data.idUser = user.id;
    console.log("DATA GOOD:");
    console.log(data);
    try {
      const res = await Service.createComment(data);
      console.log(res);
      if (res.status === 200) {
        setResponse("comment");
        toast.success("Comentario agregado");
        setLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const idbook = Desencriptar(id);
    console.log("IDBOOK");
    console.log(idbook);
    Service.getBook(idbook).then((res) => {
      console.log("RES");
      console.log(res);
      if (res.status === 200) {
        setTitle(res.data.data.title);
        setAuthor(res.data.data.author);
        setEditorial(res.data.data.editorial);
        setYearDate(res.data.data.yearDate);
        setPurchasePrice(res.data.data.purchasePrice);
        setRentalPrice(res.data.data.rentalPrice);
        setSynopsis(res.data.data.synopsis);
        setBookState(res.data.data.bookState);

        console.log("COMMENTS");
        fetchData();
      }
    });
    setResponse(null);
  }, [id, response]);

  const handledeleteComment = async (id) => {
    console.log("ID");
    console.log(id);
    try {
      const res = await Service.deleteComment(id);
      console.log(res);
      if (res.status === 200) {
        setResponse("commentDeleted");
        toast.success("Comentario eliminado");
        setLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    const idbook = Desencriptar(id);
    console.log("Comprar");
    Swal.fire({
      title: "¿Estas seguro de comprarlo?",
      text: "Vas a comprar el libro de " + title + " por Q" + purchasePrice,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmo la compra!"
    }).then((result) => {
      if (result.isConfirmed) {
        const data1 = {
          "idUser": id_user,
          "idBook": idbook
        }
        console.log(data1)
        Service.buyBook(data1)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const data2 = {
              "idUser": id_user,
              "idBook": idbook,
              "bookState": 2
            }
            Service.addHistory(data2)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
            Swal.fire({
              title: "Comprado!",
              text: "Gracias por comprar en My Library!.",
              icon: "success"
            });
            setTimeout(() => {
              navigate("/user/mybooks")
            }, 1000);
          }
        })
      }
    });
  }

  const fetchData = async () => {
    try {
      console.log("ID");
      const idbook = Desencriptar(id);
      const res = await Service.getComments(idbook);
      console.log(res);
      if (res.status === 200) {
        const updatedComments = await Promise.all(
          res.data.data.map(async (comment) => {
            const user = await Service.getUser(comment.idUser);
            const users = user.data.data;
            console.log("USERS");
            console.log(users);
            const mine =
              JSON.parse(localStorage.getItem("data_user")).id === users._id;
            return {
              ...comment,
              user: users,
              mine: mine,
            };
          })
        );
        setComments(updatedComments);
        setLoading(false);

        console.log("COMMENTS");
        console.log(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRent = () => {
    console.log("Alquilar");
    const idbook = Desencriptar(id);
    if(fechaDevolucion === ""){
      Swal.fire({
        title: "Error!",
        text: "Seleccione una fecha de devolución",
        icon: "error"
      });
      handleCloseModal();
    }
    console.log(fechaDevolucion);
    const data1 = {
      "idUser": id_user,
      "idBook": idbook,
      "returnDate": parseDate(fechaDevolucion)
    }
    console.log(data1)
    Service.rentBook(data1)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data2 = {
          "idUser": id_user,
          "idBook": idbook,
          "bookState": 1
        }
        Service.addHistory(data2)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        Swal.fire({
          title: "Alquilado!",
          text: "Gracias por alquilar en My Library!.",
          icon: "success"
        });
        setTimeout(() => {
          navigate("/user/mybooks")
        }, 1000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    }

  return (
    <div>
    <div className="flex bg-zinc-900">
      <Toaster />
      <Sidebar />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
        <div>
          <h1 className="text-white text-3xl">
            <FaBookReader className="text-3xl inline-block mr-2" />
            Detalles
          </h1>
        </div>
        <div class="max-w-2xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          <img
            class=" w-40 h-40 rounded-full mx-auto"
            src="https://i.postimg.cc/4xRKZVBJ/pila-libros-ilustracion-diseno-plano-556708-2364.jpg"
            alt="Profile picture"
          />
          <h2 class="text-center text-2xl font-semibold mt-3">{title}</h2>
          <p class="text-center mt-1 text-xl">{author}</p>
          <p class="text-left mt-1 text-xl">Año de Publicación: {yearDate}</p>
          <p class="text-left mt-1 text-xl">Editorial: {editorial}</p>
          <p class="text-left text-gray-600 mt-1 text-xl">
            Precio de Venta: Q{purchasePrice}
          </p>
          <p class="text-left text-gray-600 mt-1 text-xl">
            Precio de Renta: Q{rentalPrice}
          </p>
          <div
            className={`flex justify-center mt-5 ${
              bookState !== 0 ? "hidden" : ""
            }`}
          >
            <button
              className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-900 hover:bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={handleBuy}
            >
              <MdOutlineAddShoppingCart className="inline-block mr-2 text-lg" />{" "}
              Comprar
            </button>
            <button
              className="ml-2 mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-900 hover:bg-green-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={handleRentModal}
            >
              <MdOutlineSell className="inline-block mr-2 text-lg" /> Alquilar
            </button>
          </div>
          <div class="mt-5">
            <h3 class="text-xl font-semibold">Sinopsis</h3>
            <p class="text-gray-600 mt-2 text-lg font-light">{synopsis}</p>
          </div>
          <h3 class="text-xl font-semibold">Comentarios</h3>
          <div
            id="commentContainer"
            class="bg-white p-4 my-4 rounded shadow-md"
          >
            {loading ? (
              <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div>
                {comments.map((comment) => (
                  <div>
                    <div className="flex items-center relative mt-4">
                      <div>
                        <div className="font-semibold text-rojo2 text-xl">
                          {comment.user?.name + " " + comment.user?.lastName}{" "}
                        </div>
                        <div className="font-semibold text-gray-700 text-xs">
                          {comment.user?.email}
                        </div>
                        <div className="mt-2 text-sm font-light">
                          {comment.comment}
                        </div>
                      </div>
                      {comment.mine && (
                        <button
                          class="ml-2 text-red-400 hover:text-red-700 absolute top-0 right-0"
                        
                          onClick={() => handledeleteComment(comment._id)}
                        >
                          x
                        </button>
                      )}
                    </div>

                    <hr class="my-2 border-t-1 border-gray-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <form
            id="commentForm"
            class="mt-4"
            onSubmit={(e) => handleAddComment(e)}
          >
            <div class="flex flex-col space-y-2">
              <label for="comment" class="font-semibold text-xl">
                Agrega tu Comentario:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                class="p-2 border rounded text-sm font-light"
                required
                onChange={handleInputChange}
              ></textarea>

              <button type="submit" className="bg-rojo2 text-white p-2 rounded">
                Agregar Comentario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10" 
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="bg-zinc-800 p-4 rounded-md shadow-md z-20"> {/* Ajusta el z-index del modal */}
            {/* Contenido del modal */}
            <h2 className="text-white">Alquilar</h2>
            <p className="font-light text-white">Selecciona la fecha en que lo va a devolver</p>
            <form>
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="button"
                className="bg-green-500 text-white p-2 mr-2 rounded hover:bg-blue-700"
                onClick={handleRent}
              >Alquilar</button>

              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;