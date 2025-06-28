import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('ml-website-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('ml-website-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (!existingUser) {
      setIsLoading(false);
      return { success: false, message: 'User not found. Please sign up first.' };
    }
    
    if (existingUser.password !== password) {
      setIsLoading(false);
      return { success: false, message: 'Invalid password. Please try again.' };
    }
    
    const user: User = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    };
    
    setUser(user);
    localStorage.setItem('ml-website-user', JSON.stringify(user));
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('ml-website-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, message: 'User already exists. Please sign in instead.' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('ml-website-users', JSON.stringify(users));
    
    const user: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    
    setUser(user);
    localStorage.setItem('ml-website-user', JSON.stringify(user));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ml-website-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};