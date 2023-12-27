import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import toast, { Toaster } from "react-hot-toast";
const EditProfile = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [nombreString, setNombreString] = useState("");
  const [userDetails, setUserDetails] = useState({
    name1: "",
    name2: "",
    lastname1: "",
    lastname2: "",
    username: "",
    age: "",
    email: "",
    name: "",
    specialty: "",
    webSite: "",
  });

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
    obtenerUsuario();
  }, []);

  const handleInputChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };



  const handleEditar = async (event) => {
    event.preventDefault();
    try {
      const res = await Service.updateUser(usuario.id, userDetails);
      if (res.status === 200) {
        toast.success("Se ha actualizado su perfil de usuario correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload();
        }, 750);
        navigate("/user/myprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUsuario = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("data_user"));
      const res = await Service.getUser(data.id);
      if (res.status === 200) {
        setUserDetails(res.data.data);
        setNombreString(res.data.data.name1 + " " + res.data.data.name2+" "+res.data.data.lastname1+" "+res.data.data.lastname2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerRegresar = () => {
    navigate("/user/myprofile");
  };
  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
        <Toaster />
        <div>
          <h1 className="text-white text-3xl">
            <FaUserLarge className="text-3xl inline-block mr-2" />
            Editar Mi Perfil
          </h1>
        </div>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form
              onSubmit={(e) => { handleEditar(e); }}
            >
              <div class="mb-5">
                <label class="mb-5 block text-base font-semibold text-white sm:text-xl">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ingresa tu Nombre"
                  defaultValue={nombreString}
                  onChange={handleInputChange}
                  required={true}
                  disabled={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Sitio Web
                </label>
                <input
                  type="text"
                  name="webSite"
                  id="webSite"
                  placeholder="Ingresa tu Sitio Web"
                  defaultValue={userDetails.webSite}
                  onChange={handleInputChange}
                  required={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Dirección de correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingresa tu correo"
                  defaultValue={userDetails.email}
                  onChange={handleInputChange}
                  disabled={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Especialidad
                </label>
                <input
                  type="text"
                  name="specialty"
                  id="specialty"
                  placeholder="Ingresa tu Especialidad"
                  defaultValue={userDetails.specialty}
                  onChange={handleInputChange}
                  disabled={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Edad
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Ingresa tu Edad"
                  defaultValue={userDetails.age}
                  onChange={handleInputChange}
                  disabled={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Ingresa tu Nombre de Usuario"
                  defaultValue={userDetails.username}
                  onChange={handleInputChange}
                  required={true}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div>
                <button class="hover:shadow-form w-full rounded-md bg-rojo2 py-3 px-8 mb-3 text-center text-base font-semibold text-white outline-none">
                  Aplicar Cambios
                </button>
                <button
                  class="hover:shadow-form w-full rounded-md bg-white py-3 px-8 text-center text-base font-semibold text-rojo2 outline-none"
                  onClick={handlerRegresar}
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;



