import MessageContaier from "./MessageConteier";
import SendMessageForm from "./SendMessageForm";
import { Button } from "react-bootstrap";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({messages, users, sendMessage, closeConnection}) => <div>
    <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>Sair</Button>
    </div>
    <ConnectedUsers users={users}/>
    <div className="chat">
        <MessageContaier  messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
    </div>
</div>

export default Chat;