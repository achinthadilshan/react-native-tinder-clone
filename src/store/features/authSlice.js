import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../firebase'
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
   signOut,
} from 'firebase/auth'

const initialState = {
   isLoading: false,
   isLogin: false,
   userName: '',
   userEmail: '',
}

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
            const username = await updateProfile(auth.currentUser, {
               displayName: user.name,
            })
         }

         return auth.currentUser
      } catch (error) {
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

         return auth.currentUser
      } catch (error) {
         return thunkAPI.rejectWithValue(error.code)
      }
   }
)

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
   try {
      const response = await signOut(auth)
      return response
   } catch (error) {
      return thunkAPI.rejectWithValue(error.code)
   }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      increment: (state) => {
         // Redux Toolkit allows us to write "mutating" logic in reducers. It
         // doesn't actually mutate the state because it uses the Immer library,
         // which detects changes to a "draft state" and produces a brand new
         // immutable state based off those changes
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByAmount: (state, action) => {
         state.value += action.payload
      },
   },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer
