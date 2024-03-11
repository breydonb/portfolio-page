import React, {createContext, useContext, useState, useRef} from 'react'
import { storage } from '../index'
import { ref, getDownloadURL } from "firebase/storage"
import { FirestoreQueryContext } from './FirestoreContext'

const StorageContext = createContext()

export const StorageContextProvider = ( {children} ) => {
    const [url, setURL] = useState('')
    const { data } = FirestoreQueryContext()

    const urlRef = useRef(new Array())

    const getImage = (folder, id) =>{
        const storageRef = ref(storage)
        const imgRef = ref(storageRef, "img/")
        const folderRef = ref(imgRef, folder)
        getDownloadURL(ref(folderRef, id)).then(img =>{
            setURL([...url, {
                id: url.length,
                value: img
            }])
            console.log(url)
        })
    }

    const getImages = () =>{
        const storageRef = ref(storage)
        const imgRef = ref(storageRef, "img/")
        const folderRef = ref(imgRef, "blogs/")
        if(data.length > 1 && data.length != urlRef.current.length) {
            data.forEach(({imgName}) =>{
                getDownloadURL(ref(folderRef, imgName))
                    .then((img) => {
                        // setURL([...url, img])
                        urlRef.current = [...urlRef.current, img]
                        
                    })
                
                
            })

            
        }
        
    }

    const uploadImage = (folder, id) =>{
        
    }

    return(
        <StorageContext.Provider value={{getImage, getImages, urlRef}}>
            {children}
        </StorageContext.Provider>
    )
}

export const StorageQueryContext = () =>{
    return useContext(StorageContext);
}