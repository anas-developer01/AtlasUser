import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {login()},[])

  const login = async () => {
    const storedUser = await AsyncStorage.getItem('UserData');
    console.log(storedUser)
    if (storedUser) {
      console.log('storedUser',storedUser);
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };