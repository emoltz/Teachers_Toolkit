import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {Auth, getAuth, GoogleAuthProvider} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore';

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

export async function saveUserToFirebase(user: any) {
    const {uid, email, displayName, photoURL} = user;
    const ref = doc(getFirestore(), 'users', uid);
    const data = {
        uid,
        email,
        displayName,
        photoURL,
    };
    await setDoc(ref, data);
}