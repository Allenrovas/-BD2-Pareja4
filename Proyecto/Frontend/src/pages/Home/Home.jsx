import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import PublicationCard from "../../components/PublicationCard/PublicationCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
const Home = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('')
  const [isAdmin, setIsAdmin] = useState(false);
  const { logged, setLogged } = useUser();
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({content: ""});
  useEffect(() => {
    if (!logged) {
      navigate("/")
    }
    const user = JSON.parse(localStorage.getItem("data_user"));
    console.log(localStorage.getItem('data_user'));
    setIsAdmin(user.rol == 1);
    Service.getUser(user.id).then((res) => {
      console.log(res.data);
      const hora = new Date().getHours();

      if (hora >= 5 && hora < 12) {
        setTitulo(`¡Buenos días ${res.data.data.name}!`);
      } else if (hora >= 12 && hora < 18) {
        setTitulo(`¡Buenas tardes ${res.data.data.name}!`);
      } else {
        setTitulo(`¡Buenas noches ${res.data.data.name}!`);
      }
    });

    Service.getPublications(user.id).then((res) => {
      console.log(res);
      setPublications(res.data.data.filter(libro => libro.bookState !== 2));
    });
  }, [])

  const handleCreatePublication = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("data_user"));

    try{
      await Service.createPublication(user.id, newPublication.content);

      const updatedPublications = await Service.getPublications(user.id);
      setPublications(updatedPublications.data.data.filter(libro => libro.bookState !== 2));
      setNewPublication({content: ""});
    }catch(error){
      console.error(error);
    }

  }

    console.log(publications)
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
                  Publicaciones de los doctores
                </h1>

                <form onSubmit={handleCreatePublication}>
                  <textarea
                    value = {newPublication.content}
                    onChange={(e) => setNewPublication({ ...newPublication, content: e.target.value })}
                    placeholder="Escribe tu nueva publicación..."
                    className="w-full h-24 p-3 bg-zinc-700 text-white rounded-md mt-3"
                  />
                  <button className="`hover:shadow-form w-full rounded-md bg-rojo2 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Publicar
                  </button>

                </form>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {publications.map((publication, index) => (
                  <PublicationCard key={index} publication={publication} rol={isAdmin} usuario={publication.user} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default Home;