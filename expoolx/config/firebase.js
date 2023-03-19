import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'



const firebaseConfig = {
  apiKey: "AIzaSyCjlbzO3k8yfk7iJ_4DIhM3uQW8pDdMvEw",
  authDomain: "olxrn-427a6.firebaseapp.com",
  projectId: "olxrn-427a6",
  storageBucket: "olxrn-427a6.appspot.com",
  messagingSenderId: "269076589614",
  appId: "1:269076589614:web:918d0ac9e5caef590843bf",
  measurementId: "G-V44P7XDQC0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage();



async function login(email, password) {

  await signInWithEmailAndPassword(auth, email, password)

}


async function register(form) {

  let { name, email, password } = form
  await createUserWithEmailAndPassword(auth, email, password)

  await addDoc(collection(db, "users"), {
    name, email, password
  });

 
}
  


export {
  login,
  register,
  firebase,
  app
}