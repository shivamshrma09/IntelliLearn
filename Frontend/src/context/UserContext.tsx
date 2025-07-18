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
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within a UserProvider");
  return ctx;
};
