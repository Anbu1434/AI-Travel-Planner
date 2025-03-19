// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGVUKwsn1VoFg7JrcIFBKwCjgW4SgCP8Y",
  authDomain: "ai-travel-planner-734cb.firebaseapp.com",
  projectId: "ai-travel-planner-734cb",
  storageBucket: "ai-travel-planner-734cb.appspot.com",
  messagingSenderId: "94429366108",
  appId: "1:94429366108:web:414fc80d7a90047f546399",
  measurementId: "G-8J2L16T67J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;