import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";

const Querys = () => {
  const { logged } = useUser();
  const navigate = useNavigate();
  const [query1, setQuery1] = useState([]);
  const [query2, setQuery2] = useState([]);
  const [query3, setQuery3] = useState([]);
  const [query4, setQuery4] = useState([]);
  const [query5, setQuery5] = useState([]);


  useEffect(() => {
    if (!logged) {
      navigate("/");
    }

    Service.getQuerys().then((res) => {
      console.log(res.data);

      res.data.data.query1.sort((a, b) => {
        if (a._id == "pediatrico") {
          return -1;
        }
        if (a._id == "mediana") {
          return 0;
        }
        if (a._id == "geriatrico") {
          return 1;
        }
      }
      );

      res.data.data.query1.forEach((element) => {
        element._id = element._id.charAt(0).toUpperCase() + element._id.slice(1);
      });

      // ordenar query2 por el atributo idHabitacion de menor a mayor
      res.data.data.query2.sort((a, b) => {
        if (a._id.idHabitacion < b._id.idHabitacion) {
          return -1;
        }
        if (a._id.idHabitacion > b._id.idHabitacion) {
          return 1;
        }
        return 0;
      });

      res.data.data.query3.sort((a, b) => {
        if (a._id == "Masculino") {
          return -1;
        }
        if (a._id == "Femenino") {
          return 0;
        }
        if (a._id == "Otro") {
          return 1;
        }
      }
      );

      res.data.data.query4.sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        }
        if (a.count < b.count) {
          return 1;
        }
        return 0;
      }
      );

      res.data.data.query5.sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        }
        if (a.count < b.count) {
          return 1;
        }
        return 0;
      }
      );
      
      setQuery1(res.data.data.query1);
      setQuery2(res.data.data.query2);
      setQuery3(res.data.data.query3);
      setQuery4(res.data.data.query4);
      setQuery5(res.data.data.query5);
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Consultas
          </h1>
        </div>

        <div className="pt-6">
          <h2 className="text-white text-3xl pb-10">1. Total de pacientes que llegan a la clinica</h2>
          
          <div className="flex gap-x-4 items-center mb-9">
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query1[0]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query1[0]?._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query1[1]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query1[1]?._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query1[2]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query1[2]?._id}
              </h1>
            </div>
          </div> 
          
        </div>

        <div className="pt-20">
          <h1 className="text-white text-3xl mb-6">
            2. Cantidad de pacientes que pasan por cada habitación
          </h1>

        {
          query2.map((item, index) => (
            <div className="flex gap-x-4 items-center mb-9" key={index}>
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                {item._id.habitacion}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{item.count}</h1>
                </div>
              </div>
              <h1 className="text-white text-3xl mt-2">
                
              </h1>
            </div>
          </div>
          ))
        }


        </div>

        <div className="pt-20">
          <h1 className="text-white text-3xl mb-12">
            3. Cantidad de pacientes que llegan a la clínica por género
          </h1>

        <div className="flex gap-x-4 items-center mb-9">
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query3[0]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query3[0]?._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query3[1]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query3[1]?._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2">
                  <h1 className="text-1xl text-white">{query3[2]?.pacientes}</h1>
                </div>
              </div>
              <h1 className="text-white text-1xl mt-2 ml-10">
                {query3[2]?._id}
              </h1>
            </div>
          </div>

        </div>

        <div className="pt-20">
          <h1 className="text-white text-3xl mb-6">
            4. Top 5 edades más atendidas en la clínica
          </h1>

        <div className="flex gap-x-4 items-center mb-9">
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                Top Edad
              </h1>
            </div>
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                Cantidad de pacientes
              </h1>
            </div>
          </div>


        {
          query4.map((item, index) => (
            <div className="flex gap-x-4 items-center mb-9" key={index}>
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                #{index+1} - Edad {item._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2 mr-20">
                  <h1 className="text-1xl text-white">{item.count}</h1>
                </div>
              </div>
              <h1 className="text-white text-3xl mt-2">
                
              </h1>
            </div>
          </div>
          ))
        }

        </div>



        <div className="pt-20">
          <h1 className="text-white text-3xl mb-6">
            5. Top 5 edades menos atendidas en la clínica
          </h1>
          

          <div className="flex gap-x-4 items-center mb-9">
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                Top Edad
              </h1>
            </div>
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                Cantidad de pacientes
              </h1>
            </div>
          </div>


        {
          query5.map((item, index) => (
            <div className="flex gap-x-4 items-center mb-9" key={index}>
            <div className="flex-1">
              <h1 className="text-white text-1xl mt-2 ml-20">
                #{index+1} - Edad {item._id}
              </h1>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-20 h-16 rounded-full bg-rojo2 mr-20">
                  <h1 className="text-1xl text-white">{item.count}</h1>
                </div>
              </div>
              <h1 className="text-white text-3xl mt-2">
                
              </h1>
            </div>
          </div>
          ))
        }

        </div>


      </div>
    </div>
  );
};

export default Querys;
