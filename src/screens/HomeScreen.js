import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
   const navigation = useNavigation()

   return (
      <SafeAreaView>
         <Text>HomeScreen</Text>
      </SafeAreaView>
   )
}

export default HomeScreen
