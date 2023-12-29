import React from "react";


const PublicationCard = ({publication}) => {

  const convertBase64ToImage = (ext, base64) => {
    return "data:image/"+ext+";base64," + base64;
  };

  return (
    <div>
  <div className="relative flex flex-col mt-6 text-white bg-red-900 shadow-md bg-clip-border rounded-xl max-w-full sm:max-w-96 p-4">
    <div className="p-6">
      <img className="w-36 h-36 rounded-full mx-auto mb-4" src={convertBase64ToImage(publication.extPhoto, publication.photo)} alt={publication.name} />

      {/* nombre del usuario de la publicacion */}
      <h5 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
        {publication.name}
      </h5>

      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        {publication.title}
      </h5>

      <p className="block font-sans text-base antialiased text-center my-8 text-xl font-light leading-relaxed text-inherit">
        <span className="">{publication.publication}</span>
      </p>

      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        <span className="font-bold">Autor: </span>{publication.email}
      </p>

      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        <span className="font-bold">Fecha: </span>{publication.date}
      </p>
    </div>
  </div>
</div>

  );
};

export default PublicationCard;
