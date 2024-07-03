// MessageContext.tsx
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface MessageContextType {
  message: string;
  messageStatus: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageStatus: Dispatch<SetStateAction<string>>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  console.log(context);

  if (!context) {
    return {
      message: "",
      messageStatus: "",
      setMessage: () => { },
      setMessageStatus: () => { }
    };
  }
  return context;
};

export const MessageProvider: React.FC = ({ children }: any) => {
  const [message, setMessage] = useState<string>("");
  const [messageStatus, setMessageStatus] = useState<string>("");

  const contextValue = {
    message,
    messageStatus,
    setMessage,
    setMessageStatus,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};
