import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearCardMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const addCardMessage = (message) => {
    if(!deleted) {
      setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
    }
    else {
      setMessages([makeMessage(message, ADD_MESSAGE_COLOR)]);
      setDeleted(false);
    }
  };

  //new
  const clearCardMessage = (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setDeleted(true);
  }
  //new

  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearCardMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
