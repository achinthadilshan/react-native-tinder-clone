import {
   View,
   Text,
   TextInput,
   KeyboardAvoidingView,
   Pressable,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Fontisto'
import { useState } from 'react'

const LoginScreen = () => {
   const [islogin, setIsLogin] = useState(true)
   const navigation = useNavigation()

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
                  />
               )}

               {/* Email */}
               <TextInput
                  className="w-full rounded-xl bg-white p-4"
                  placeholder="Email"
                  keyboardType="email-address"
               />

               {/* Password */}
               <TextInput
                  className="mt-2 w-full rounded-xl bg-white p-4"
                  placeholder="Password"
                  secureTextEntry={true}
               />
               {/* Confirm Password */}
               {!islogin && (
                  <TextInput
                     className="mt-2 w-full rounded-xl bg-white p-4"
                     placeholder="Confirm Password"
                     secureTextEntry={true}
                  />
               )}

               {/* Button */}
               <Pressable className="mt-4 w-full rounded-xl bg-black p-4">
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
