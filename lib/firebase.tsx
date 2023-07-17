import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {Auth, getAuth, GoogleAuthProvider} from 'firebase/auth';
import {User} from "@firebase/auth";
import {doc, Firestore, getDoc, getFirestore, setDoc} from "@firebase/firestore";
import * as Models from "./dataShape";

const firebaseConfig = {
    //load apiKey from .env file
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: "projectowl-4022e.firebaseapp.com",
    projectId: "projectowl-4022e",
    storageBucket: "projectowl-4022e.appspot.com",
    messagingSenderId: "584727270744",
    appId: "1:584727270744:web:b9d1bba8aa9203e7a4012d",
    measurementId: "G-VK9Q5YF4DR"
}


let app;
let auth: Auth;
let analytics;
let provider: GoogleAuthProvider;

if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
    provider = new GoogleAuthProvider();
}

export {app, auth, analytics, provider};

export async function saveUserToFirestore(user: User) {
    const db: Firestore = getFirestore();
    const {uid, email, displayName, photoURL} = user;
    const ref = doc(db, 'Users', uid)
    const userObject = new Models.User(uid, email, displayName, photoURL).toObject();
    await setDoc(ref, userObject);
}

export async function checkIfUserInDatabase(user: User){
    const db = getFirestore();
    const userRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(userRef);

    return !docSnap.exists();


}