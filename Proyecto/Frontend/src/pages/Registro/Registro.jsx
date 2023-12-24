import React, { useRef, useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import toast, { Toaster } from "react-hot-toast";

function Registro() {
  const [account, setAccount] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    specialty: "",
    webSite: "",
    password: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    try {

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

      console.log(error.response.data.message);

      if (error.response.data.message === "User already registered") {
        toast.error("Error al registrar - El nombre de usuario ya existe.", {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        toast.error(
          "Error al registrar - Intenta de nuevo.",
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
            backgroundImage: "url('https://i.postimg.cc/W4vxLn2v/OQ6UTW0.jpg')",
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-gris3">
          <form className="bg-gris3" onSubmit={submitRegister}>
            <h1 className="text-white font-bold text-4xl mb-1 ">
              <span>Bienvenido</span>, Regístrate
            </h1>
            <p className="text-s font-normal text-white mb-7">
              Un lugar donde puedes compartir tus casos clínicos
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
                placeholder="Nombre Completo"
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
                name="username"
                id="username"
                onChange={handleInputChange}
                placeholder="Nombre de Usuario"
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="file"
                accept=".jpeg, .png, .jpg"
                name="photo"
                id="photo"
                onChange={e => setAccount({ ...account, photo: e.target.files[0] })}
                placeholder="Foto de Perfil"
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                type="number"
                name="age"
                id="age"
                onChange={handleInputChange}
                placeholder="Edad"
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
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                onChange={handleInputChange}
                type="text"
                name="specialty"
                id="specialty"
                placeholder="Especialidad"
                required
                style={{ width: "100%" }}
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-gris3 text-white"
                onChange={handleInputChange}
                type="text"
                name="webSite"
                id="webSite"
                placeholder="Sito Web"
                style={{ width: "100%" }}
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
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
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
