import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [flagReload, setFlagReload] = useState(false);

  const getUserData = () => {
    setUserData({
      name: localStorage.getItem('user_name'),
      accessToken: localStorage.getItem('accessToken'),
    });
  };  

  useEffect(() => {
    getUserData();
  }, [flagReload]);


  return (
    <UserContext.Provider value={{ userData, setUserData, flagReload, setFlagReload }}>
      { children }
    </UserContext.Provider>
  );
};
