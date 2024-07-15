import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { set } from "firebase/database";
import { act } from "react";
import { arrayUnion, arrayRemove, addDoc, collection } from "firebase/firestore";
import firebaseApp from '../../app/firebase';
import { auth, db } from '../../app/firebase';
const initialState = {
  userData : [],
  userTransactions: {
    Transactions: {
      userBalance: "0",
      userIncome: "0",
      userExpense: "0",
    },
  },
};
export const fetchUserTransactions = createAsyncThunk(
  "addUser/fetchUserTransactions",
  async (_, thunkAPI) => {
    let uid = auth.currentUser.uid;
    const docRef = doc(db, "userTransactions", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log("Document data:", docSnap.data());
      return data;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
);
export const appSlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      pushUserData: (state, action) => {
        state.userData.push(action.payload)
      },
      getUserTransactions: (state, action) => {
        state.userTransactions.Transactions.userBalance =
          action.payload.userTransaction.userBalance;
        state.userTransactions.Transactions.userIncome =
          action.payload.userTransaction.userIncome;
        state.userTransactions.Transactions.userExpense =
          action.payload.userTransaction.userExpense;
        console.log(state.userTransactions);
      },
    }
}
)
export const {pushUserData, getUserTransactions} = appSlice.actions;
export default appSlice.reducer;
