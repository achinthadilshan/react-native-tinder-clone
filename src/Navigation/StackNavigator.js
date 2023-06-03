import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
   )
}

export default StackNavigator
