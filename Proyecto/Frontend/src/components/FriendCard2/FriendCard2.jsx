import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";

const FriendCard2 = ( { book }) => {

  const navigate = useNavigate();
  
  const convertBase64ToImage = (base64) => {
    return "data:image/"+book.extPhoto+";base64," + base64;
  };

  const viewProfileHandler = (id) => {
    navigate(`/user/profile/${id}`);
    window.location.reload();
  };

  return (
    <>
    <Toaster />
    <div className="relative flex flex-col mt-6 text-white bg-red-900 shadow-md bg-clip-border rounded-xl max-w-full sm:max-w-96 p-4">
      <div className="p-6 text-center">
        {/* ver imagen que viene en formato base64 */}
        <img className="w-36 h-36 mx-auto mb-4" src={convertBase64ToImage(book.photo)} alt={book.name} />

        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {book.name}
        </h5>
        {/* Boton de ver perfil y boton de eliminar amigo */}
        <div className="flex justify-center mt-4">
          <button className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-yellow-900 hover:bg-yellow-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={() => viewProfileHandler(book.email)}>
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FriendCard2;
