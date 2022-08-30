import { useState } from "react";
import { Button, Form,  FormControl, InputGroup } from "react-bootstrap";

const SendMessageForm = ({sendMessage}) => {

    const [message, setMessage] = useState('');

    return <Form onSubmit = { e=> {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <InputGroup className="mb-3">
            <FormControl placeholder="mensagem..." onChange={ e => setMessage(e.target.value)} value={message} />
            <Button  className="input-group-text" variant="primary" type="submit" disabled={!message}>Enviar</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;