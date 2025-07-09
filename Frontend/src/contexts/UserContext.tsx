import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  streak: number;
  level: string;
  avatar: string;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addPoints: (points: number) => void;
  updateStreak: (streak: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Shivam Sharma',
    email: 'shivam@example.com',
    points: 2450,
    streak: 7,
    level: 'Advanced',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64'
  });

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addPoints = (points: number) => {
    setUser(prev => ({ ...prev, points: prev.points + points }));
  };

  const updateStreak = (streak: number) => {
    setUser(prev => ({ ...prev, streak }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addPoints, updateStreak }}>
      {children}
    </UserContext.Provider>
  );
};