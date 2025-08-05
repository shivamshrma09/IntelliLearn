import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
  _id: string;
  name: string;
  email: string;
  totalPoints?: number;
  rank?: number;
  streak?: number;
  numberOfBatchesCompleted?: number;
} | null;

type UserContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

export const UserDataContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within a UserProvider");
  return ctx;
};
