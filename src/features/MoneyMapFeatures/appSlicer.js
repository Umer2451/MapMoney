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
  lastTransactions: [],
  profilepic: "",
  setProfilepicURL: "",
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
export const updateUserTransactions = createAsyncThunk(
  "addUser/updateUserTransactions",
  async (newData, thunkAPI) => {
    debugger
    let uid = auth.currentUser.uid;
    try {
      let updateTransactionsDoc = doc(db, "userTransactions", uid);
      await setDoc(
        updateTransactionsDoc,
        { merge: true },
        {
          userBalance: updateTransactionsDoc.userBalance,
          userIncome: updateTransactionsDoc.userIncome,
          userExpense: updateTransactionsDoc.userExpense,
        }
      );

      // To update age and favorite color:
      await updateDoc(updateTransactionsDoc, {
        userBalance: newData.userBalance,
        userIncome: newData.userIncome,
        userExpense: newData.userExpense,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Initialize lastTransactions document if it doesn't exist
export const initializeLastTransactions = createAsyncThunk(
  "addUser/updateUserTransactions",
  async (_, thunkAPI) => {
  let uid = auth.currentUser.uid;
  await setDoc(doc(db, "lastTransactions", uid), {
    lastTransactions: []
  });  
});

// Update lastTransactions in Firestore
export const updateLastTransactions = createAsyncThunk(
  "addUser/updateLastTransactions",
  async (newData, thunkAPI) => {
    try {
      const uid = auth.currentUser.uid;
      const updateLastTransactionsDoc = doc(db, "lastTransactions", uid);

      // Attempt to update the document with arrayUnion
      const docSnap = await updateDoc(updateLastTransactionsDoc, {
        lastTransactions: arrayUnion({
          description: newData.description,
          method: "added manually",
          date: newData.date,
          amount: newData.amount,
          image: newData.image
        })
      });

      if (docSnap) {
        console.log("Document updated successfully:", docSnap);
        return newData; // Return the updated data if needed
      } else {
        console.log("No such document!");
        return thunkAPI.rejectWithValue("No such document!");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserLastTransactions = createAsyncThunk(
  "addUser/fetchUserLastTransactions",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const uid = user.uid;
      const docRef = doc(db, "lastTransactions", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        console.log("Document data:", data);
        return data;
      } else {
        console.log("No such document!");
        return {};
      }
    } catch (error) {
      console.error("Error fetching last transactions:", error);
      return thunkAPI.rejectWithValue(error.message);
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
      getUserTransactionsLocal: (state, action) => {
        state.userTransactions.Transactions.userBalance =
          action.payload.newObject.userBalance;
        state.userTransactions.Transactions.userIncome =
          action.payload.newObject.userIncome;
        state.userTransactions.Transactions.userExpense =
          action.payload.newObject.userExpense;
        console.log(state.userTransactions);
      },
      setProfilePic(state, action) {
        state.profilepic = action.payload;
      },
      uploadProfilePicURL(state, action) {
        state.setProfilepicURL = action.payload;
      },
      updateLastTransactionState(state, action){
        state.lastTransactions = action.payload
      },
      pushManuallyaddedTransaction(state, action){
        state.lastTransactions.push(action.payload)
      }
    }
}

)
export const {pushUserData, getUserTransactions, getUserTransactionsLocal, pushManuallyaddedTransaction, updateLastTransactionState} = appSlice.actions;
export default appSlice.reducer;
