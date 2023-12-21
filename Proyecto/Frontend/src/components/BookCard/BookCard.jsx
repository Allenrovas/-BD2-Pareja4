import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineAddShoppingCart, MdOutlineSell } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Service from "../../Service/Service";
import { Encriptar } from "../../utils/main";
const BookCard = ({book, rol}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const id_user = JSON.parse(localStorage.getItem("data_user")).id;
  const navigate = useNavigate();
  const verMas = (id) => {
    const idbook = Encriptar(id);
    navigate(`/user/book/${idbook}`);
  }

  const parseDate = (inputDate) => {
    const fecha = new Date(`${inputDate}T23:59:59.000Z`);
    return fecha.toISOString();
  }

  const handleBuy = () => {
    console.log("Comprar");
    Swal.fire({
      title: "¿Estas seguro de comprarlo?",
      text: "Vas a comprar el libro de " + book.title + " por Q" + book.purchasePrice,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmo la compra!"
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          "idUser": id_user,
          "idBook": book._id
        }
        console.log(data)
        Service.buyBook(data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const data2 = {
              "idUser": id_user,
              "idBook": book._id,
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
              window.location.reload();
            }, 1000);
          }
        })
      }
    });
  }

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

  const handleRent = () => {
    console.log("Alquilar");
    if(fechaDevolucion === ""){
      Swal.fire({
        title: "Error!",
        text: "Seleccione una fecha de devolución",
        icon: "error"
      });
      handleCloseModal();
    }
    console.log(fechaDevolucion);
    const data = {
      "idUser": id_user,
      "idBook": book._id,
      "returnDate": parseDate(fechaDevolucion)
    }
    Service.rentBook(data)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data2 = {
          "idUser": id_user,
          "idBook": book._id,
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
          text: "Gracias por alquilar en My Library!, Recuerda devolverlo antes de fecha indicada a las 23:59:59.",
          icon: "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    handleCloseModal();
  }

  return (
    <div>
      <div className="relative flex flex-col mt-6 text-white bg-red-900 shadow-md bg-clip-border rounded-xl max-w-full sm:max-w-96 p-4">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {book.title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <span className="font-bold">Autor: </span>{book.author}
          </p>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <span className="font-bold">Editorial: </span>{book.editorial}
          </p>
          <p className="block font-sans text-lg antialiased font-semi-bold leading-relaxed text-inherit">
            Renta: Q<span> {book.purchasePrice}</span><br />
            Compra: Q<span> {book.rentalPrice}</span>
          </p>
        </div>
        <div className={`${rol?'hidden':''}`}>
          <div className={`p-6 pt-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center`}>
            <button
              className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-900 hover:bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              disabled={book.bookState === 1}
              onClick={handleBuy}
            >
              <MdOutlineAddShoppingCart className="inline-block mr-2 text-lg"/> {book.bookState !== 1 ? 'Comprar' : 'No puede comprar'}
            </button>
            <button
              className={`mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg ${book.bookState===1?"bg-zinc-600 hover:bg-zinc-500":"bg-green-900 hover:bg-green-500"} text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none`}
              type="button"
              disabled={book.bookState === 1}
              onClick={handleRentModal}
            >
              <MdOutlineSell className="inline-block mr-2 text-lg" /> {book.bookState !== 1 ? 'Alquilar' : 'Alquilado'}
            </button>
          </div>
          <div className="p-6 pt-0 flex justify-center">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-zinc-900 hover:bg-zinc-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => verMas(book._id)}
            >
              <FaEye className="inline-block mr-2 text-lg" /> Ver Más
            </button>
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

export default BookCard;
