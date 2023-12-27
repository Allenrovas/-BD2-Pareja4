import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import pdfSvg from "../../assets/pdfsvg.svg";
const Profile = () => {
  const navigate = useNavigate();

  const handlerEdit = () => {
    navigate("/user/editprofile");
  };

  const handlerPdf = async (e) => {
    try{
      const file = e.target.files[0];
      const res = await Service.uploadPdf(file, userDetails.email);
      if (res.status === 200) {
        console.log("pdf subido");
        //Recargar la pagina
        window.location.reload();
      }else{
        toast.error("Error al subir el pdf");
      }
    }catch(error){
      console.log(error);
    }
  };

  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [listaCasos, setListaCasos] = useState([]);
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
    obtenerCasos();
  }, []);
  console.log(userDetails.password)
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

const obtenerCasos = async () => {
  try {
    //Obtener nombre de los pdf
    const data = JSON.parse(localStorage.getItem("data_user"));
    const res = await Service.getFiles(data.id);
    console.log(res.data.data);
    if (res.status === 200) {
      setListaCasos(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}

const obtenerPdf = (buffer) => {
  const blob = new Blob([buffer], { type: "application/pdf" });
  return URL.createObjectURL(blob);
};



  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
        <div>
          <h1 className="text-white text-3xl">
            <FaUserLarge className="text-3xl inline-block mr-2" />
            Mi Perfil
          </h1>
        </div>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form>
              <div class="mb-5">
                <label class="mb-3 block text-base font-semibold text-white sm:text-xl">
                  Nombre Completo
                </label>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <h2 className="text-4xl text-white font-light">
                        {nombreString}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="phone"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Nombre de Usuario
                </label>
                <h2 className="text-4xl text-white font-light">
                  {userDetails.username}
                </h2>
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Dirección de correo electrónico
                </label>
                <h2 className="text-4xl text-white font-light">
                    {userDetails.email}
                </h2>
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Sitio Web
                </label>
                <h2 className="text-4xl text-white font-light">
                  {userDetails.webSite}
                </h2>
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Especialidad
                </label>
                <h2 className="text-4xl text-white font-light">
                  {userDetails.specialty}
                </h2>
              </div>

              <div class="mb-5">
                <label
                  class="mb-3 block text-base font-medium text-white"
                >
                  Edad
                </label>
                <h2 className="text-4xl text-white font-light">
                  {userDetails.age}
                </h2>
              </div>

              <div>
                <button
                  className={`hover:shadow-form w-full rounded-md bg-rojo2 py-3 px-8 text-center text-base font-semibold text-white outline-none ${usuario.rol ===1?'hidden':'' }`}
                  onClick={handlerEdit}
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
        
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl mb-6">
            Mis Casos que estoy trabajando en formato
          </h1>

          <ul className="w-full">
            {listaCasos.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-2 py-2 px-3 rounded-2xl mb-4"
              >
                <div>
                  <img src={pdfSvg} className="w-10 mr-2" alt="" />
                </div>
                <div>
                  <h1 className="text-white text-xl">{item.name}</h1>
                </div>
                <div>
                  <a
                    href={obtenerPdf(item.content.data)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xl"
                  >
                    Ver
                  </a>
                </div>
              </li>
            ))}
          </ul>




          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <div>
              <img src={pdfSvg} className="w-10 mr-2" alt="" />
            </div>

            <input
              className="pl-2 outline-none border-none bg-gris3 text-white"
              type="file"
              accept=".pdf"
              onChange={handlerPdf}
              name="pdf"
              id="pdf"
              placeholder="Pdf de caso"
              required
            />
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Profile;