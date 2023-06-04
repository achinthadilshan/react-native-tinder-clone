import {
   View,
   Text,
   TextInput,
   KeyboardAvoidingView,
   Pressable,
   ActivityIndicator,
} from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Fontisto'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, signInUser } from '../store/features/authSlice'

const LoginScreen = () => {
   const [islogin, setIsLogin] = useState(true)
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const navigation = useNavigation()
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.auth)

   const loginHandler = async () => {
      const user = {
         name: username,
         email,
         password,
      }

      setUsername('')
      setEmail('')
      setPassword('')

      if (islogin) {
         dispatch(signInUser(user))
      } else {
         dispatch(signUpUser(user))
      }
   }

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      })
   }, [])

   return (
      <LinearGradient
         className="flex-1"
         colors={['#FF655B', '#FF5864', '#FD297B']}>
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 items-center justify-center">
            <View className="w-full items-center px-6">
               <Icon name="tinder" size={75} color={'white'} />
               <Text className="mb-5 text-3xl font-bold text-white">
                  tinder
               </Text>
               {/* Username */}
               {!islogin && (
                  <TextInput
                     className="w-full rounded-xl bg-white p-4"
                     placeholder="Username"
                     value={username}
                     onChangeText={(text) => setUsername(text)}
                  />
               )}

               {/* Email */}
               <TextInput
                  className="mt-2 w-full rounded-xl bg-white p-4"
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
               />

               {/* Password */}
               <TextInput
                  className="mt-2 w-full rounded-xl bg-white p-4"
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
               />

               {/* Button */}
               <Pressable
                  onPress={loginHandler}
                  className="mt-4 w-full rounded-xl bg-black p-4">
                  <Text className="text-center font-bold text-white">
                     {islogin ? `Login` : `Register`}
                  </Text>
               </Pressable>

               {/* Switch login mode */}
               <Text className="mt-5 text-white">
                  {islogin
                     ? `Don't have an account? `
                     : `Already have an account? `}
                  <Text
                     suppressHighlighting={true}
                     className="bg-green font-bold"
                     onPress={() => setIsLogin((prev) => !prev)}>
                     {islogin ? `Sign up` : `Login`}
                  </Text>
               </Text>
            </View>
         </KeyboardAvoidingView>
      </LinearGradient>
   )
}

export default LoginScreen
