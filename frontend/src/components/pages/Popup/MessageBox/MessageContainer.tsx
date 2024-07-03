import React from 'react';
import { useMessageContext } from './MessageContext';
import MessageBox from './MessageBox';

const MessageBoxContainer: React.FC = () => {
    const { message, messageStatus, setMessage, setMessageStatus } = useMessageContext();

    return (
        <MessageBox
            status={messageStatus}
            message={message}
            setMessage={setMessage}
            title="inasd"
        />
    );
};

export default MessageBoxContainer;