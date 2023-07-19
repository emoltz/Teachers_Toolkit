import {initializeApp} from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import {Auth, getAuth, GoogleAuthProvider} from 'firebase/auth';
import {User} from "@firebase/auth";
import {
    collection,
    doc,
    Firestore,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where
} from "@firebase/firestore";
import * as Models from "./dataShape";
import {SavedText} from "./dataShape";


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
let analytics: Analytics;
let provider: GoogleAuthProvider;
let db: Firestore;

if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
    provider = new GoogleAuthProvider();
    db = getFirestore();

}

export {app, auth, analytics, provider};

function firebaseNoUserWarning(): void {
    console.warn("No user. Source: ", "/lib/firebase.tsx")
}

export async function saveUserToFirestore(user: User) {
    const db: Firestore = getFirestore();
    const {uid, email, displayName, photoURL} = user;
    const ref = doc(db, 'Users', uid)
    const userObject = new Models.User(uid, email, displayName, photoURL).toObject();
    await setDoc(ref, userObject);
}

export async function checkIfUserInDatabase(user: User) {
    const db = getFirestore();
    const userRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(userRef);

    return !docSnap.exists();
}

export async function saveGeneratedText(user: User, savedTextClass: Models.SavedTextClass) {
    // this is for when the user generates text, NOT when they choose to save it.
    const db: Firestore = getFirestore();
    if (savedTextClass.language == "") {
        savedTextClass.language = "English";
    }
    if (savedTextClass.gradeLevel == "") {
        savedTextClass.gradeLevel = "1st Grade";
    }
    const {uid, email, displayName, photoURL} = user;
    // const savedTextObject: Models.SavedTextClass = new Models.SavedTextClass(uid, gradeLevel, language, generatedText, originalText, title, notes);
    const ref = doc(db, 'Users', uid, 'SavedText', savedTextClass.id);
    await setDoc(ref, savedTextClass.toObject()).then(() => {
        console.log("Success: ");
        console.log(savedTextClass);
    });

}

export async function setGeneratedTextToSaved(user: User, savedText: SavedText) {
    if (!user) {
        firebaseNoUserWarning();
        return;
    }
    const db = getFirestore();
    const docRef = doc(db, "Users", user.uid, "SavedText", savedText.id);
    return updateDoc(docRef, {
        saved: true
    });
}

export async function getAllGenerations(user: User | null): Promise<SavedText[]> {
    if (!user) {
        firebaseNoUserWarning();
        return [];
    }

    const savedTexts: SavedText[] = [];
    const db = getFirestore();
    const q = query(collection(doc(collection(db, 'Users'), user.uid), 'SavedText'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data: SavedText = doc.data() as SavedText;
        data.id = doc.id;
        savedTexts.push(data);
    });
    return savedTexts;
}


export async function getSavedGenerations(user: User | null): Promise<SavedText[]> {
    if (!user) {
        firebaseNoUserWarning();
        return [];
    }
    const savedTexts: SavedText[] = [];
    const db = getFirestore();
    const q = query(collection(doc(collection(db, 'Users'), user.uid), 'SavedText'), where('saved', '==', true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data() as SavedText;
        data.id = doc.id;
        savedTexts.push(data);
    });
    return savedTexts;
}

export async function getGenerationById(user: User | null, id: string): Promise<SavedText | undefined> {
    if (!user) {
        firebaseNoUserWarning();
        return;
    }
    const db: Firestore = getFirestore();

    const q = query(collection(doc(collection(db, 'Users'), user.uid), 'SavedText'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log("error: no document exists");
        return;
    }
    let docData = null;
    querySnapshot.forEach((doc) => {
        docData = doc.data() as SavedText;
    });

    if (docData === null) {
        throw new Error("No document found with the given id");
    }

    return docData;
}

export async function updateGeneration(user: User | null, id: string, updatedGeneration: SavedText): Promise<void> {
    if (!user) {
        firebaseNoUserWarning();
        return;
    }
    const docRef = doc(collection(db, 'Users'), user.uid, 'SavedText', id);
    await updateDoc(docRef, {
        title: updatedGeneration.title,
        generatedText: updatedGeneration.generatedText,
    })
}