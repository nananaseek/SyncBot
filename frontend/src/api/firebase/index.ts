// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqISDC25uJNKatP-8M2Sk9puQu4QjCJ40",
  authDomain: "syncbot-images.firebaseapp.com",
  projectId: "syncbot-images",
  storageBucket: "syncbot-images.appspot.com",
  messagingSenderId: "111518507645",
  appId: "1:111518507645:web:ec4073f5a17b8173604714",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
