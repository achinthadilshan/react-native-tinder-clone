import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/Navigation/StackNavigator'
import { store } from './src/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message'

export default function App() {
   return (
      <NavigationContainer>
         <Provider store={store}>
            <StackNavigator />
            <Toast />
         </Provider>
      </NavigationContainer>
   )
}
