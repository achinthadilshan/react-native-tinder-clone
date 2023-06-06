import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, signOutUser } from '../store/features/authSlice'
import Swiper from 'react-native-deck-swiper'
import Icon from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
   const [dummyData, setDummyData] = useState([])
   const navigation = useNavigation()
   const dispatch = useDispatch()
   const userData = useSelector(selectAuth)

   const signOutHandler = () => {
      dispatch(signOutUser())
   }

   useEffect(() => {
      // const url = 'https://randomuser.me/api/?results=10'
      const url = 'https://jsonplaceholder.typicode.com/users'

      const fetchData = async () => {
         const response = await fetch(url, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         })
         console.log(response)
      }

      fetchData()
      // setDummyData((prev) => [...prev, ...response.results])
   }, [])

   return (
      <SafeAreaView>
         {/* Header */}
         <View className="flex-row items-center justify-between px-5 py-3">
            <Pressable onPress={signOutHandler}>
               {userData.image ? (
                  <Image
                     className="h-10 w-10 rounded-full"
                     source={{ uri: userData.image }}
                  />
               ) : (
                  <Image
                     className="h-10 w-10 rounded-full"
                     source={require('../../assets/images/user.png')}
                  />
               )}
            </Pressable>

            <Pressable>
               <Image
                  className="h-14 w-14"
                  source={require('../../assets/images/tinder.png')}
               />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Chat')}>
               <Icon name="chatbubbles" size={36} color={'#ff5864'} />
            </Pressable>
         </View>
         {/* End of header */}

         {/* Cards */}
         {/* <Swiper /> */}
         {/* End of cards */}
      </SafeAreaView>
   )
}

export default HomeScreen
