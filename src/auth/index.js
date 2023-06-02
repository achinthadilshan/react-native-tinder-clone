// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyCXVVOwYRuQT-BX-q770_36AVZUxuQ1cvY',
   authDomain: 'react-native-tinder-clon-bf354.firebaseapp.com',
   projectId: 'react-native-tinder-clon-bf354',
   storageBucket: 'react-native-tinder-clon-bf354.appspot.com',
   messagingSenderId: '427569552832',
   appId: '1:427569552832:web:76891f9a520874e3173c25',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
