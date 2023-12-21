import React from "react";
import { FaEye } from "react-icons/fa";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Service from "../../Service/Service";
import { Encriptar } from "../../utils/main";
const RentCardBook = ({book}) => {
  const navigate = useNavigate();
  const verMas = (id) => {
    const idbook = Encriptar(id);
    navigate(`/user/book/${idbook}`);
  }
  const formatearFecha = (fechaISO) => {
    console.log(fechaISO);
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }

  const haPasado = (fechaISO) => {
    const fechaActual = new Date();
    const fechaComparar = new Date(fechaISO);

    const milisegundosFechaActual = fechaActual.getTime();
    const milisegundosFechaComparar = fechaComparar.getTime();

    return milisegundosFechaComparar < milisegundosFechaActual;
  }

  const handleReturn = () => {
    console.log("Devolver");
    const data = {
      "idUser": JSON.parse(localStorage.getItem("data_user")).id,
      "idBook": book._id
    }
    console.log(data)
    Service.returnBook(data)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data2 = {
          "idUser": JSON.parse(localStorage.getItem("data_user")).id,
          "idBook": book._id,
          "bookState": 3
        }
        Service.addHistory(data2)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        Swal.fire({
          title: "Gracias por devolverlo!",
          text: "Sigue usando nuestros libros en My Library!.",
          icon: "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  return (
    <div className="relative flex flex-col mt-6 text-white bg-red-900 shadow-md bg-clip-border rounded-xl max-w-full sm:max-w-96 p-4">
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {book.title}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {book.synopsis}
        </p>
        <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-inherit">
          Fecha de devolución:  <span className="font-light">{formatearFecha(book.returnDate)}</span>
        </p>
        <p className={`${haPasado(book.returnDate)?'block font-sans antialiased font-semibold leading-relaxed text-inherit text-2xl': 'hidden'}`}>
          ¡Caducó la fecha de devolución!, Dévuelvalo lo antes posible  
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
        <button
          className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-yellow-900 hover:bg-yellow-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleReturn}
        >
          <RiContactsBookUploadFill  className="inline-block mr-2 text-lg" /> Devolver
        </button>
        <button
          className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-zinc-900 hover:bg-zinc-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => verMas(book._id)}
        >
          <FaEye className="inline-block mr-2 text-lg" /> Ver más
        </button>
      </div>
    </div>
  );
};

export default RentCardBook;