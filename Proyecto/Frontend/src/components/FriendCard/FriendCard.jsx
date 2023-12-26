import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Service from "../../Service/Service";

const FriendCard = ( { book }) => {


  const convertBase64ToImage = (base64) => {
    return "data:image/"+book.extPhoto+";base64," + base64;
  };

  const eliminarAmigo = (friendEmail) => {
    const user = JSON.parse(localStorage.getItem("data_user"));
    const dataa = {
      email: user.id,
      friendEmail: friendEmail
    }
    Service.deleteFriend(dataa)
      .then((res) => {
        console.log(res.data);
        toast.success("Amigo eliminado");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Error al eliminar amigo", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
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
          <button className="px-4 py-2 bg-rojo2 text-white text-lg rounded-md">
            Ver Perfil
          </button>
          <button className="px-4 py-2 bg-rojo2 text-white text-lg rounded-md ml-4" onClick={() => eliminarAmigo(book.email)}>
            Eliminar Amigo
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FriendCard;
