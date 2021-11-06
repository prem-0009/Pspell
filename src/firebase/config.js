import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyCp1lt--lZ6OB124J5dA3gi_VBn4hMNrx8",
  authDomain: "kids-spell-f0f85.firebaseapp.com",
  projectId: "kids-spell-f0f85",
  storageBucket: "kids-spell-f0f85.appspot.com",
  messagingSenderId: "740427382355",
  appId: "1:740427382355:web:13e567e0415b0a4f3910a6",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);




// -----------------------------------------------google

const provider = new GoogleAuthProvider();


export const auth = getAuth();

export const signInWithGoogle =()=> signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    // console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
// -----------------------------------------------google



