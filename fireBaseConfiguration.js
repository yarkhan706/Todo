import {initializeApp} from "firebase/app"
// import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDzi7Ffu7cC3MVSS5zHj6GCk_xWwsu-3d0",
    authDomain: "todo-d3dda.firebaseapp.com",
    databaseURL: "https://todo-d3dda-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-d3dda",
    storageBucket: "todo-d3dda.appspot.com",
    messagingSenderId: "36581931564",
    appId: "1:36581931564:web:cf5e62eaf41439fbe16f89",
    measurementId: "G-8QX6RCDSG8"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig)
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
