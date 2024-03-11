import React, {createContext, useContext, useState} from 'react'
import { db } from "../index";
import { collection, getDocs, setDoc, getDoc, doc } from 'firebase/firestore';

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({children}) => {
    const[data, setData] = useState([{}]);
    const[userData, setUserData] = useState([])

    const createUserInformation = async (fullName, hasAdminPrivilege, imageUrl, username, uid) => {
        try {
            const docRef = await setDoc(doc(db, "users", uid), {
              displayName: fullName,
              hasAdmin: hasAdminPrivilege,
              imageUrl: imageUrl,
              userName: username,
              uid: uid
            });
            console.log("Document written with ID: ", docRef.id);
          } 
        catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    // const getUserInformation = async (id) => {
    //   try{
    //       const docRef = doc(db, "users", id);
    //       const docSnap = await getDoc(docRef)
    //       if(docSnap.exists()){
            
    //       }
    //   } catch(e){
    //     console.error(e.message)
    //   }
    // }

    // Gets all users
    const getDocuments = async (col) => {
      const querySnapshot = await getDocs(collection(db, col));
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }

    

    // Gets one user's info from document
    const getDocument = async (documentName, id) => {
      const docRef = doc(db, documentName, id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        if (documentName === "users") {
          setUserData(docSnap.data())
          console.log("pulling user data")
        }
        else if(documentName === "blogs"){
          setData(docSnap.data());
          
        }
        else{
          console.log("unknown error")
        }
      }
       else {
          console.log("No such document!");
      }
    }

    // const getBlogInformation = async (id) => {
    //   const docRef = doc(db, "blogs", id);
    //   const docSnap = await getDoc(docRef);
    //   if(docSnap.exists()){
    //     console.log("Document data:", docSnap.data());
    //   } else{
    //     console.log("No file exists")
    //   }
    // }

    const getAllBlogInformation = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"))
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    }

    return(
        <FirestoreContext.Provider value={ {createUserInformation, getDocuments, getDocument, data, userData}}>
            {children}
        </FirestoreContext.Provider>
    )
}

export const FirestoreQueryContext = () =>{
    return useContext(FirestoreContext);
}