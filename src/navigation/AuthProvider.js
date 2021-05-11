import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

const id = () => {
  return Math.floor(Math.random() * 99999);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  function login(email, password) {
    setUser({id: id(), email, password});
  }

  function logout() {
    setUser(null);
  }

  function editUserProfile(newEmailValue, newPasswordValue) {
    setUser({
      ...user,
      email: newEmailValue || user.email,
      password: newPasswordValue || user.password,
    });
  }

  return (
    <AuthContext.Provider
      value={{user, setUser, login, logout, editUserProfile}}>
      {children}
    </AuthContext.Provider>
  );
};
