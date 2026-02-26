import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { updateDeviceTokenWithBackend } from '../utils/pushNotification';

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => { login() }, [])

  useEffect(() => {
    if (user?.token) {
      updateDeviceTokenWithBackend(user.token);
    }
  }, [user]);

  const login = async () => {
    const storedUser = await AsyncStorage.getItem('UserData');
    if (storedUser) {
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