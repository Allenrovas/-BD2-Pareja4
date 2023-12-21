import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import BookCard from "../../components/BookCard/BookCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
const Home = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('')
  const [isAdmin, setIsAdmin] = useState(false);
  const { logged, setLogged } = useUser();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (!logged) {
      navigate("/")
    }
    const user = JSON.parse(localStorage.getItem("data_user"));
    console.log(localStorage.getItem('data_user'));
    setIsAdmin(user.rol == 1);
    Service.getUser(user.id).then((res) => {
      console.log(res);
      const hora = new Date().getHours();

      if (hora >= 5 && hora < 12) {
        setTitulo(`Buenos días ${res.data.data.name + " " + res.data.data.lastName}!`);
      } else if (hora >= 12 && hora < 18) {
        setTitulo(`Buenas tardes ${res.data.data.name + " " + res.data.data.lastName}!`);
      } else {
        setTitulo(`Buenas noches ${res.data.data.name + " " + res.data.data.lastName}!`);
      }
    });

    Service.getBooks().then((res) => {
      console.log(res);
      setBooks(res.data.data.filter(libro => libro.bookState !== 2));
    });
  }, [])
    console.log(books)
    return(
        <div className="flex bg-zinc-900">
            <Sidebar />
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
              <h1 className="text-white text-4xl pb-3">{titulo}</h1>
                <h1 className="text-white">
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
                  Catálogo de Libros
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <BookCard key={index} book={book} rol={isAdmin} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default Home;