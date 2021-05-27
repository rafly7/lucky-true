import { createContext, useState } from 'react'

export const ListWinnerContext = createContext();

export const ListWinnerProvider = props => {
  const [listWinner, setListWinner] = useState([]);
  return (
    <ListWinnerContext.Provider value={[listWinner, setListWinner]}>
      {props.children}
    </ListWinnerContext.Provider>
  );
};
