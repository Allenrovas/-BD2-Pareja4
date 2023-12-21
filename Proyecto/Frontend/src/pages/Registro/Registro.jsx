import React, { useRef, useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import toast, { Toaster } from "react-hot-toast";

function Registro() {
  const [account, setAccount] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDay: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  function parseDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      account.birthDay = parseDate(account.birthDay);
      console.log(account.birthDay);

      if (!validPassword(account.password)) {
        toast.error(
          "Error al registrar - La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.",
          {
            position: "upper-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      
      const res = await Service.registro(account);
      console.log("esta es la respuesta:");
      console.log(res);
      console.log("Fin de la respuesta");
      if (res.status === 200) {
        toast.success("Su registro ha sido exitoso.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error("Error al registrar");
      }
    } catch (error) {
      toast.error(
        "Error al registrar - Revisa tus credenciales e Intenta de nuevo.",
        {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="h-screen md:flex font">
        <div
          className="fuente3 relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-lightPurple to-purple-700 i justify-around items-center hidden"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/y8Jb088T/imagen-2023-12-08-114349361.png')",
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div style={{ width: "400px", height: "400px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="opacity-60 mx-auto text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-gris3">
          <form className="bg-gris3" onSubmit={submitRegister}>
            <h1 className="text-white font-bold text-4xl mb-1 ">
              <span>Bienvenido</span>, Regístrate
            </h1>
            <p className="text-s font-normal text-white mb-7">
              Un lugar donde puedes obtener tus libros favoritos
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rojo1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
                placeholder="Nombres"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rojo1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                placeholder="Apellidos"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rojo1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="number"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                placeholder="Número de Teléfono"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-rojo1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rojo1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-rojo1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="date"
                name="birthDay"
                id="birthDay"
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-red-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-red-900 transition duration-300 ease-in-out"
            >
              Registrar
            </button>
            <p className="mt-6 text-xs text-white text-center">
              También puedes{" "}
              <Link
                to="/"
                className="border-b border-rojo1 border-dotted text-red-500 hover:text-red-800 transition-all duration-300 ease-in-out"
              >
                Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registro;
