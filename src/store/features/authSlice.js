import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../firebase'
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
   signOut,
} from 'firebase/auth'

export const signUpUser = createAsyncThunk(
   'auth/signUp',
   async (user, thunkAPI) => {
      try {
         const response = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
         )

         if (response) {
            await updateProfile(auth.currentUser, {
               displayName: user.name,
            })
         }

         console.log('register success')

         const userData = {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
         }
         return userData
      } catch (error) {
         console.log(error.code)
         return thunkAPI.rejectWithValue(error.code)
      }
   }
)

export const signInUser = createAsyncThunk(
   'auth/signIn',
   async (user, thunkAPI) => {
      try {
         const response = await signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
         )

         console.log('login success')

         const userData = {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
         }

         return userData
      } catch (error) {
         console.log('login failed')
         return thunkAPI.rejectWithValue(error.code)
      }
   }
)

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
   try {
      const response = await signOut(auth)
      console.log('logout success')
      return response
   } catch (error) {
      console.log('logout failed')
      return thunkAPI.rejectWithValue(error.code)
   }
})

const initialState = {
   isLoading: false,
   isLogin: false,
   userName: null,
   email: null,
   isError: false,
   message: null,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   extraReducers: (builder) => {
      builder
         // Sign Up
         .addCase(signUpUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLogin = true
            state.userName = action.payload.username
            state.email = action.payload.email
         })
         .addCase(signUpUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
         })

         // Sign In
         .addCase(signInUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(signInUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLogin = true
            state.userName = action.payload.username
            state.email = action.payload.email
         })
         .addCase(signInUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
         })

         // Sign Out
         .addCase(signOutUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(signOutUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLogin = false
            state.userName = null
            state.email = null
         })
         .addCase(signOutUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
         })
   },
})

export default authSlice.reducer
