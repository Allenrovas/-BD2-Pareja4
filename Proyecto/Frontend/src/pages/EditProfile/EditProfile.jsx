import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import toast, { Toaster } from "react-hot-toast";
const EditProfile = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [userDetails, setUserDetails] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
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

  function parseDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  function parseDate2(inputDate) {
    const parts = inputDate.split('/');
    const jsDate = new Date(parts[2], parts[1] - 1, parts[0]);

    const day = jsDate.getDate().toString().padStart(2, "0");
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jsDate.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  const handleEditar = async (event) => {
    event.preventDefault();
    try {
      userDetails.birthDate = parseDate(userDetails.birthDate);
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
        res.data.data.birthDate = parseDate2(res.data.data.birthDate);
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
              <div class="mb-5 pt-3">
                <label class="mb-5 block text-base font-semibold text-white sm:text-xl">
                  Nombre Completo
                </label>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="name"
                        class="mb-3 block text-base font-medium text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingresa tu Nombre"
                        defaultValue={userDetails.name}
                        onChange={handleInputChange}
                        required={true}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="name"
                        class="mb-3 block text-base font-medium text-white"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Ingresa tu Apellido"
                        defaultValue={userDetails.lastName}
                        onChange={handleInputChange}
                        required={true}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="phone"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Número de Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Ingresa tu número de teléfono"
                  defaultValue={userDetails.phone}
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
                  for="name"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  defaultValue={userDetails.password}
                  onChange={handleInputChange}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  for="date"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  defaultValue={userDetails.birthDate}
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



