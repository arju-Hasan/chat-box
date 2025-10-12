// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPpPhTJcbLptprZfpatNjuMB1x_6oWGro",
  authDomain: "my-firebase-app-72a09.firebaseapp.com",
  projectId: "my-firebase-app-72a09",
  storageBucket: "my-firebase-app-72a09.firebasestorage.app",
  messagingSenderId: "267024524361",
  appId: "1:267024524361:web:339ed28a7ee6a08fa50b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);