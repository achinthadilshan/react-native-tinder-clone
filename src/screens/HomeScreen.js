import {
   View,
   Text,
   SafeAreaView,
   Pressable,
   Image,
   ActivityIndicator,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
   const swipeRef = useRef(null)

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
      <SafeAreaView className="flex-1">
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

            <Pressable onPress={() => navigation.navigate('Modal')}>
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
            <View className="h-3/4 w-full items-center justify-center">
               <ActivityIndicator size={'large'} />
            </View>
         ) : (
            <View className=" h-3/4 w-full flex-1">
               <Swiper
                  ref={swipeRef}
                  cards={dummyData}
                  stackSize={5}
                  verticalSwipe={false}
                  infinite={true}
                  backgroundColor={'transparent'}
                  cardVerticalMargin={20}
                  marginBottom={20}
                  onSwipedLeft={() => {
                     // console.log('pass LEFT')
                  }}
                  onSwipedRight={() => {
                     // console.log('pass RIGHT')
                  }}
                  overlayLabels={{
                     left: {
                        element: (
                           <View className="h-3/4 items-end rounded-xl bg-red-500/50 p-4">
                              <Icon
                                 name="close-circle"
                                 size={60}
                                 color={'red'}
                              />
                           </View>
                        ),
                     },
                     right: {
                        element: (
                           <View className="h-3/4 items-start rounded-xl bg-green-500/50 p-4">
                              <Icon name="heart" size={60} color={'green'} />
                           </View>
                        ),
                     },
                  }}
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

         <View className="w-full flex-row items-center justify-evenly pb-2">
            <Pressable
               className="rounded-full bg-red-300 p-3"
               onPress={() => swipeRef.current.swipeLeft()}>
               <Icon name="ios-close" size={30} color={'red'} />
            </Pressable>
            <Pressable
               className="rounded-full bg-green-300 p-3"
               onPress={() => swipeRef.current.swipeRight()}>
               <Icon name="heart" size={30} color={'green'} />
            </Pressable>
         </View>
      </SafeAreaView>
   )
}

export default HomeScreen
