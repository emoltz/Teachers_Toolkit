import {initializeApp} from "firebase/app";
import dynamic from 'next/dynamic';
import {getAnalytics} from "firebase/analytics";
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {collection, addDoc, doc, getDocs, getFirestore, setDoc, query, where} from 'firebase/firestore';
import {useEffect, useState} from "react";

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
let auth;
let analytics;

if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
}

export {app, auth, analytics};

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