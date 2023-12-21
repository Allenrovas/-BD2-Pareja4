import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
const History = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [historial, setHistorial] = useState([]);
    const tipoTransaccion = ["Alquilar", "Compra", "Devolución"]
    const { logged } = useUser();
    function formatearFechaHora(fechaISO) {
        const fecha = new Date(fechaISO);
      
        // Obtiene día, mes, año, horas, minutos y segundos
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 porque los meses van de 0 a 11
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
      
        return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    }

    useEffect(() => {
        if(!logged){
            navigate("/")
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        Service.getUser(user.id)
        .then((res) => {
            setNombre(res.data.data.name + " " + res.data.data.lastName);
        })
        .catch((err) => {
            console.log(err);
        });
        Service.getHistory(user.id)
        .then((res) => {
            console.log(res);
            setHistorial(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(historial)
    return (
        <div className="flex bg-zinc-900">
            <Sidebar />
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
                <div>
                    <h1 className="text-white text-3xl">
                    <FaHistory className="text-3xl inline-block mr-2"/>
                    Mi Historial
                    </h1>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"/>
                        <div class="flex flex-wrap -mx-3 mb-5">
                        <div class="w-full max-w-full px-3 mb-6  mx-auto">
                            <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                            <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">

                                <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span class="mr-3 font-semibold text-dark">Mi historial de transacciones</span>
                                    <span class="mt-1 font-medium text-secondary-dark text-lg/normal">{nombre}</span>
                                </h3>
                                </div>
                                <div class="flex-auto block py-8 pt-6 px-9">
                                <div class="overflow-x-auto">
                                    <table class="w-full my-0 align-middle text-dark border-neutral-200">
                                    <thead class="align-bottom">
                                        <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                                        <th class="pb-3 text-start min-w-[175px]">NOMBRE DEL LIBRO</th>
                                        <th class="pb-3 pr-12 text-end min-w-[175px]">ACCION</th>
                                        <th class="pb-3 text-end min-w-[50px]">FECHA Y HORA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historial.map((transaction, index) => (
                                            <tr class="border-b border-dashed last:border-b-0">
                                                <td class="p-3 pl-0">
                                                    <div class="flex items-center">
                                                    <div class="relative inline-block shrink-0 rounded-2xl me-3">
                                                        <img src="https://cdn.icon-icons.com/icons2/41/PNG/128/redBook_7072.png" class="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt=""/>
                                                    </div>
                                                    <div class="flex flex-col justify-start">
                                                        <a href="javascript:void(0)" className={`mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary`}> {transaction.idBook.title} </a>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td class="p-3 pr-12 text-end">
                                                    {console.log(transaction.bookState)}
                                                    <span class={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none ${transaction.bookState===1?'text-primary bg-primary-light':transaction.bookState===2?'text-warning bg-warning-light':'text-success bg-success-light'} rounded-lg`}> {tipoTransaccion[transaction.bookState-1]} </span>
                                                </td>
                                                <td class="p-3 pr-0 text-end">
                                                    <span class="font-semibold text-light-inverse text-md/normal">{formatearFechaHora(transaction.createdAt)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-5">
                        <div class="w-full max-w-full sm:w-3/4 mx-auto text-center">
                            
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default History;