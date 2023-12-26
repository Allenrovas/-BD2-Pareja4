import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
import FriendCard from "../../components/FriendCard/FriendCard";
const Friends = () => {
  const { logged } = useUser();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
    const user = JSON.parse(localStorage.getItem("data_user"));
    Service.getFriends(user.id)
      .then((res) => {
        console.log(res.data.data);
        setFriends(res.data.data);
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
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Mis Amigos
          </h1>
        </div>
        <div className="pt-4">
          <div
            id="cartas"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {friends.length === 0 ? (
              <div className="flex items-center x-screen justify-center">
                <div className="max-w-md w-full p-6 rounded-md shadow-md">
                  <p className="text-2xl text-center text-white">
                    Aún no tienes amigos :c
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => navigate("/user/addfriends")}
                      className="px-4 py-2 bg-rojo2 text-white rounded-md"
                    >
                      Añadir Amigos
                    </button>
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
                <FriendCard key={index} book={book} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
