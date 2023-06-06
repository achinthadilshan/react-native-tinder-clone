import {
   View,
   Text,
   SafeAreaView,
   Pressable,
   Image,
   ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, signOutUser } from '../store/features/authSlice'
import Swiper from 'react-native-deck-swiper'
import Icon from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
   const [dummyData, setDummyData] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const navigation = useNavigation()
   const dispatch = useDispatch()
   const userData = useSelector(selectAuth)

   const signOutHandler = () => {
      dispatch(signOutUser())
   }

   useEffect(() => {
      const url = 'https://dummyjson.com/users'

      const fetchData = async () => {
         try {
            const response = await fetch(url)
            const data = await response.json()

            if (data) {
               setDummyData((prev) => [...prev, ...data.users])
            }
            setIsLoading(false)
         } catch (error) {
            console.log(error)
            return
         }
      }

      fetchData()
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
         {isLoading ? (
            <ActivityIndicator />
         ) : (
            <View className="flex-1">
               <Swiper
                  cards={dummyData}
                  stackSize={5}
                  cardIndex={0}
                  verticalSwipe={false}
                  animateCardOpacity
                  infinite={true}
                  renderCard={(card) => (
                     <View
                        key={card.id}
                        className="relative h-3/4 rounded-xl bg-white shadow">
                        <Image
                           className="h-full w-full rounded-xl bg-gray-400"
                           source={{ uri: card.image }}
                        />
                        <View className="absolute bottom-0 w-full rounded-b-xl bg-white px-5 py-4">
                           <Text className="text-xl font-bold">
                              {card.firstName} {card.lastName}
                           </Text>
                           <Text className="text-gray-500">
                              Age: {card.age}
                           </Text>
                        </View>
                     </View>
                  )}
               />
            </View>
         )}
         {/* End of cards */}
      </SafeAreaView>
   )
}

export default HomeScreen
