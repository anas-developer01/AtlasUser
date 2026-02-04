import React, { useContext, useEffect } from 'react';
import { ScreenNavigator } from './src/navigations/ScreenNavigator';
import { AppContext } from './src/context/AppProvider';

const App = () => { 
   const { login } = useContext(AppContext);

   useEffect(() => {
      login();
   },[]);

   return (
      <>
         <ScreenNavigator/>
      </>
   )
};

export default App;