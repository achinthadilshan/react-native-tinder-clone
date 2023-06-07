import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/features/authSlice'

const ModalScreen = () => {
   const userData = useSelector(selectAuth)
   return (
      <View className="relative flex-1 p-4">
         <View className="flex-row justify-center space-x-1 align-bottom">
            <Icon name="tinder" size={35} color={'#ff5864'} />
            <Text className="text-4xl font-bold text-gray-700">tinder</Text>
         </View>

         <Text className="my-3 text-center text-lg font-semibold text-gray-500">
            Welcome {userData.userName}
         </Text>

         <View className="mt-4 items-center space-y-2">
            <Text className="font-semibold text-[#ff5864]">
               Step 1: Choose a profile picture
            </Text>
            <TextInput
               className="w-full rounded-md bg-gray-200 px-2 py-3 text-center"
               placeholder="Enter a profile pic URL"
            />
         </View>

         <View className="mt-4 items-center space-y-2">
            <Text className="font-semibold text-[#ff5864]">
               Step 2: The Occupation
            </Text>
            <TextInput
               className="w-full rounded-md bg-gray-200 px-2 py-3 text-center"
               placeholder="Enter your occupation"
            />
         </View>

         <View className="mt-4 items-center space-y-2">
            <Text className="font-semibold text-[#ff5864]">
               Step 2: The Age
            </Text>
            <TextInput
               className="w-full rounded-md bg-gray-200 px-2 py-3 text-center"
               placeholder="Enter your age"
            />
         </View>

         <Pressable className="absolute bottom-5 mx-4 w-full rounded-lg bg-[#ff5864] px-2 py-4">
            <Text className="text-center font-semibold text-white">
               Update Profile
            </Text>
         </Pressable>
      </View>
   )
}

export default ModalScreen
