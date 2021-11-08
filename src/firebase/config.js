import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // apiKey: "AIzaSyCp1lt--lZ6OB124J5dA3gi_VBn4hMNrx8",
  // authDomain: "kids-spell-f0f85.firebaseapp.com",
  // projectId: "kids-spell-f0f85",
  // storageBucket: "kids-spell-f0f85.appspot.com",
  // messagingSenderId: "740427382355",
  // appId: "1:740427382355:web:13e567e0415b0a4f3910a6",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line
      const token = credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line
      const errorCode = error.code;
      // eslint-disable-next-line
      const errorMessage = error.message;
      // The email of the user's account used.
      // eslint-disable-next-line
      const email = error.email;
      // The AuthCredential type that was used.
      // eslint-disable-next-line
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
