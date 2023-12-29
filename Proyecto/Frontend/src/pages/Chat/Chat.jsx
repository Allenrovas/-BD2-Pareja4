import React, { useEffect, useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUser } from "../../userCtx/User";
const Chat = () => {
    const navigate = useNavigate();
    const { logged } = useUser();
    const [friends, setFriends] = useState([]);
    const [friendSelected, setFriendSelected] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!logged) {
        navigate("/");
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        setUser(user);
        Service.getFriends(user.id)
        .then((res) => {
            console.log(res.data.data);
            setFriends(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const convertBase64ToImage = (base64,extPhoto) => {
        return "data:image/"+extPhoto+";base64," + base64;
      };

    const onSelectFriend = async (friend) => {
        setFriendSelected(friend);
        await handlerGetMessages(user.id, friend.email);
    }

    const handlerSendMessage = async () => {
        const data = {
            email: user.id,
            friendEmail: friendSelected.email,
            message: newMessage
        }
        Service.sendMessage(data)
        setNewMessage("");
        console.log("Mensaje enviado")
        //Obtener los mensajes
        await handlerGetMessages(user.id, friendSelected.email);
    }

    const handlerGetMessages = async (userId, friendEmail) => {
        const data = {
            email: userId,
            friendEmail: friendEmail,
        };

        try {
            const res = await Service.getMessages(data);
            console.log(res.data.data);
            setMessages(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex bg-zinc-900">
            <Sidebar />
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide">
                <div>
                    <h1 className="text-white text-3xl">
                    <FaRocketchat className="text-3xl inline-block mr-2"/>
                    Chat con Doctores
                    </h1>

                    <div className="flex flex-col">
                        <h2 className="text-white text-xl mt-5">Amigos</h2>
                        <div className="grid grid-cols-8 gap-4">
                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                className="flex flex-col items-center justify-center bg-zinc-800 rounded-md p-2"
                                onClick={() => onSelectFriend(friend)}
                            >
                                <img
                                src={convertBase64ToImage(friend.photo, friend.extPhoto)}
                                alt={friend.name}
                                className="w-20 h-20 rounded-full"
                                />
                                <p className="text-white text-lg">{friend.name}</p>
                            </div>
                            ))}
                        </div>
                    </div>

                    {friendSelected && (
                        <div className="flex flex-col mt-5">
                            <h2 className="text-white text-xl">Chat con {friendSelected.name}</h2>
                            <div className="flex flex-col items-center justify-center bg-zinc-800 rounded-md p-2">
                                <img
                                src={convertBase64ToImage(friendSelected.photo, friendSelected.extPhoto)}
                                alt={friendSelected.name}
                                className="w-20 h-20 rounded-full"
                                />
                                <p className="text-white text-lg">{friendSelected.name}</p>
                            </div>
                            <div className="message-container mt-3" style={{height: "300px", overflowY: "scroll"}}>
                            {messages.map((message,index) => (
                                <div key={index} className={`flex flex-col items-${message.author === user.id ? "end" : "start"} justify-center bg-zinc-800 rounded-md p-2`}>
                                    <p className="text-white text-lg">{message.message}</p>
                                    <p className="text-white text-xs">{message.date}</p>
                                </div>
                            ))}
                            </div>
                            <div className="flex flex-col mt-3">
                                <textarea className="w-full h-20 bg-zinc-800 rounded-md p-2 text-white" placeholder="Escribe un mensaje..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                <button className="bg-rojo2 rounded-md p-2 mt-2 text-white" onClick={handlerSendMessage} disabled={newMessage === ""}>Enviar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;