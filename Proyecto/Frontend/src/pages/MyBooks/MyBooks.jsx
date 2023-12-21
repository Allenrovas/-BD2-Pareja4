import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import MyCardBook from "../../components/MyCardBook/MyCardBook";
import RentCardBook from "../../components/RentCardBook/RentCardBook";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
const MyBooks = () => {
    const { logged } = useUser();
    const navigate = useNavigate();
    const [librosComprados, setLibrosComprados] = useState([]);
    const [librosAlquilados, setLibrosAlquilados] = useState([]);
    useEffect(() => {
        if(!logged){
            navigate("/")
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        Service.getBooksByUser(user.id)
        .then((res) => {
            setLibrosAlquilados(res.data.data.rentedBooks);
            setLibrosComprados(res.data.data.purchasedBooks);
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
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`inline-block mr-2 w-10 h-10 text-white`}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                  </svg>
                  Mis Libros
                </h1>
                </div>
                <div className="pt-4">
                    <h2 className="text-white text-2xl">Alquilados</h2>
                    <div id="cartas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {librosAlquilados.length===0?
                        <div className="flex items-center x-screen justify-center">
                            <div className="max-w-md w-full p-6 rounded-md shadow-md">
                                <p className="text-2xl text-center text-white">No tienes libros alquilados :c</p>
                                <img className="mx-auto mt-4" src="http://imgfz.com/i/j5mwYls.png" alt="Emoji triste"/>
                            </div>
                        </div>
                        :
                        librosAlquilados.map((book, index) => (
                            <RentCardBook key={index} book={book} />
                        ))}
                        
                    </div>
                </div>
                <div className="pt-4">
                    <h2 className="text-white text-2xl">De mi propiedad</h2>
                    <div id="cartas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {librosComprados.length===0?
                        <div className="flex items-center x-screen justify-center">
                            <div className="max-w-md w-full p-6 rounded-md shadow-md">
                                <p className="text-2xl text-center text-white">No tienes libros Comprados :c</p>
                                <img className="mx-auto mt-4" src="http://imgfz.com/i/j5mwYls.png" alt="Emoji triste"/>
                            </div>
                        </div>
                        :
                        librosComprados.map((book, index) => (
                            <MyCardBook key={index} book={book} />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MyBooks;