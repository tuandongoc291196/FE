import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ1pea0jlM-Wfp_WI-mrLqVl5vvQvQQfQ",
  authDomain: "wedding-platform-aebc2.firebaseapp.com",
  projectId: "wedding-platform-aebc2",
  storageBucket: "wedding-platform-aebc2.appspot.com",
  messagingSenderId: "573761065711",
  appId: "1:573761065711:web:1b72e42d4c7ee698a4411a",
  measurementId: "G-D341NRPY1F",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const storage = getStorage(app)


export const firebaseNotificationConfig = {
  apiKey: "AIzaSyDfp79kmkeFu7T1U7lKIvEea_5dtIzf2HQ",
  authDomain: "apits-32832.firebaseapp.com",
  projectId: "apits-32832",
  storageBucket: "apits-32832.appspot.com",
  messagingSenderId: "580512757743",
  appId: "1:580512757743:web:5583e929c7cf875d72a81a",
  measurementId: "G-GRKCSDWWSE"
};

