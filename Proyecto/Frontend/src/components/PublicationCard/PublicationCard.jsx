import React from "react";


const PublicationCard = ({publication}) => {

  return (
    <div>
      <div className="relative flex flex-col mt-6 text-white bg-red-900 shadow-md bg-clip-border rounded-xl max-w-full sm:max-w-96 p-4">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {publication.title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <span className="font-bold">{publication.publication}</span>
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
