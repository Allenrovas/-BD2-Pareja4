import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import pdfSvg from "../../assets/pdfsvg.svg";
import FriendCard2 from "../../components/FriendCard2/FriendCard2";
const ProfileFriend = () => {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [listaCasos, setListaCasos] = useState([]);
  const [nombreString, setNombreString] = useState("");
  const [friends, setFriends] = useState([]);
  const { id:idUser } = useParams();

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
    obtenerAmigos();
  }, []);
  console.log(userDetails.password)
  const obtenerUsuario = async () => {
    try {
      const res = await Service.getUser(idUser);
      if (res.status === 200) {
        setUserDetails(res.data.data);
        setNombreString(res.data.data.name1 + " " + res.data.data.name2+" "+res.data.data.lastname1+" "+res.data.data.lastname2);
      }
    } catch (error) {
      console.log(error);
    }
  };

const obtenerAmigos = async () => {
  try {
    const res = await Service.getFriends2(idUser);
    console.log(res.data.data);
    if (res.status === 200) {
      setFriends(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}


const obtenerCasos = async () => {
  try {
    const res = await Service.getFiles(idUser);
    console.log(res.data.data);
    if (res.status === 200) {
      setListaCasos(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}

const obtenerPdf = (buffer) => {
  try {
    // Crear un Uint8Array desde el buffer
    const uint8Array = new Uint8Array(buffer);

    // Crear un Blob a partir del Uint8Array
    const blob = new Blob([uint8Array], { type: "application/pdf" });

    // Crear una URL para el Blob
    const pdfUrl = URL.createObjectURL(blob);

    return pdfUrl;
  } catch (error) {
    console.error("Error al crear el PDF:", error);
    return null;
  }
};




  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
        <div>
          <h1 className="text-white text-3xl">
            <FaUserLarge className="text-3xl inline-block mr-2" />
            Perfil de {nombreString}
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

              
            </form>
          </div>
        </div>
        
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl mb-6">
            Mis Casos que estoy trabajando
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

        </div>

        <div className="pt-4">

        <div>
          <h1 className="text-white text-3xl py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`inline-block mr-2 w-10 h-10 text-white`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Mis Amigos
          </h1>
        </div>

          <div
            id="cartas"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {friends.length === 0 ? (
              <div className="flex items-center x-screen justify-center">
                <div className="max-w-md w-full p-6 rounded-md shadow-md">
                  <p className="text-2xl text-center text-white">
                    Aún no tiene amigos :c
                  </p>
                  <div className="flex justify-center mt-4">
                  </div>
                  <img
                    className="mx-auto mt-4"
                    src="http://imgfz.com/i/j5mwYls.png"
                    alt="Emoji triste"
                  />
                </div>
              </div>
            ) : (
              friends.map((book, index) => (
                <FriendCard2 key={index} book={book} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileFriend;