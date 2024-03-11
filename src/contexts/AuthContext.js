import React, {createContext, useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from "../index";
import { FirestoreQueryContext } from './FirestoreContext';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const[user, setUser] = useState({});

    const createUser = (email, password, fullName) => {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
            const user = userCredential.user
            userCredential.user.displayName = fullName;
        })
    }

    const logout = () => {
        return signOut(auth)
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = async (fullName, photoURL) => {
        try{
            if(typeof(photoURL, undefined)){
                updateProfile(auth.currentUser, {
                    displayName: fullName
                  }).then(() => {
                    console.log("Successfully updated user")
                  });
            } else {
                updateProfile(auth.currentUser, {
                    displayName: fullName, photoURL: photoURL
                  }).then(() => {
                    console.log("Successfully updated user")
                  });
            }
        } catch(e){

        }
    }

    // async function updateUserProfile(fullName){
    //     updateProfile(auth.currentUser, {
    //         displayName: fullName
    //       }).then(() => {
    //         console.log("Successfully updated user")
    //       }).catch((e) => {
            
    //       });
    // }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
          setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[])

    return(
        <UserContext.Provider value={{createUser, user, logout, signin, updateUserProfile}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(UserContext)
}
