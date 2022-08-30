import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/Chat';

const App = () => {
  const [aconnection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7119/chat", {
          transport:
             HttpTransportType.WebSockets |
             HttpTransportType.LongPolling,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
          //console.log("Recebido:", message);
          setMessages(messages => [...messages, {user, message}]);
        });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e =>{
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      await connection.invoke("JoinRoom", {user, room});  
      setConnection(connection);  
      //console.log(aconnection);

    } catch (error) {
      console.log(error);
    }
  };


  const sendMessage = async (message) => {
    try{
      aconnection.invoke("SendMessage", message);
    } catch(error) {
      console.log(error);
    }
  }

  const closeConnection = async (message) => {
    try{
      await aconnection.stop();
    } catch(error) {
      console.log(error);
    }
  }

   return <div className='app'>
    <h2>The chat</h2>
    <hr />
    {
      !aconnection ?
        <Lobby joinRoom={joinRoom} />
      :
        <Chat messages={messages}  users={users} sendMessage={sendMessage} closeConnection={closeConnection} />
    }
    
  </div>
}

export default App;
