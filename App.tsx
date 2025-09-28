import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { GlobalProvider } from './src/contexts/GlobalContext';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <StackNavigator />
      </GlobalProvider>
    </NavigationContainer>
  );
}

export default App;
