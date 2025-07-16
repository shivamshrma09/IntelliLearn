import React, { createContext, useContext, useState } from 'react';

export const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error("useUserData must be used within a UserProvider");
  return context;
};
