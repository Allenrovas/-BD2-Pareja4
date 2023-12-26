import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
import AddFriendCard from "../../components/AddFriendCard/AddFriendCard";
const AddFriends = () => {
  const { logged } = useUser();
  const navigate = useNavigate();
  const [friendsInCommonSpecialty, setFriendsInCommonSpecialty] = useState([]);
  const [friendsInCommon, setFriendsInCommon] = useState([]);
  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
    const user = JSON.parse(localStorage.getItem("data_user"));
    Service.getFriendsInCommon(user.id)
      .then((res) => {
        console.log(res.data.data)
        setFriendsInCommon(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Service.getFriendsSuggestionsBySpecialty(user.id)
      .then((res) => {
        console.log(res.data.data)
        setFriendsInCommonSpecialty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
        <div>
          <h1 className="text-white text-3xl">
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Añadir Amigos
          </h1>
        </div>
        <div className="pt-4">
          <h2 className="text-white text-3xl">Buscar</h2>
          <div
            id="cartas"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {friendsInCommon.length === 0 ? (
              <div className="flex items-center x-screen justify-center">
                <div className="max-w-md w-full p-6 rounded-md shadow-md">
                  <p className="text-xl text-center text-white">
                    Ninguna coincidencia :c
                  </p>
                  <img
                    className="mx-auto mt-4"
                    src="http://imgfz.com/i/j5mwYls.png"
                    alt="Emoji triste"
                  />
                </div>
              </div>
            ) : (
              friendsInCommon.map((book, index) => (
                <AddFriendCard key={index} book={book} />
              ))
            )}
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-white text-3xl mb-6">Sugerencias de Amistad</h1>
          <h2 className="text-white text-2xl">Amigos de tus amigos:</h2>
          <div
            id="cartas"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {friendsInCommon.length === 0 ? (
              <div className="flex items-center x-screen justify-center">
                <div className="max-w-md w-full p-6 rounded-md shadow-md">
                  <p className="text-xl text-center text-white">
                    No tenemos amigos para ofrecerte :c
                  </p>
                  <img
                    className="mx-auto mt-4"
                    src="http://imgfz.com/i/j5mwYls.png"
                    alt="Emoji triste"
                  />
                </div>
              </div>
            ) : (
              friendsInCommon.map((book, index) => (
                <AddFriendCard key={index} book={book} />
              ))
            )}
          </div>
        </div>
        <div className="pt-4">
          <h2 className="text-white text-2xl">En el mismo campo que tú:</h2>
          <div
            id="cartas"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {friendsInCommonSpecialty.length === 0 ? (
              <div className="flex items-center x-screen justify-center">
                <div className="max-w-md w-full p-6 rounded-md shadow-md">
                  <p className="text-xl text-center text-white">
                    ¿Has completado tu perfil? No hay coincidencias con tu campo de estudio
                  </p>
                  <img
                    className="mx-auto mt-4"
                    src="http://imgfz.com/i/j5mwYls.png"
                    alt="Emoji triste"
                  />
                </div>
              </div>
            ) : (
              friendsInCommonSpecialty.map((book, index) => (
                <AddFriendCard key={index} book={book} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
