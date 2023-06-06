import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/features/authSlice'
import ModalScreen from '../screens/ModalScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
   const userData = useSelector(selectAuth)
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {/* {userData.authenticated ? (
            <>
               <Stack.Screen name="Home" component={HomeScreen} />
               <Stack.Screen name="Chat" component={ChatScreen} />
            </>
         ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
         )} */}
         <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
         </Stack.Group>
         <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
         </Stack.Group>
      </Stack.Navigator>
   )
}

export default StackNavigator
