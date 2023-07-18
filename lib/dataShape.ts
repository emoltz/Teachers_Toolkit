import {FieldValue, serverTimestamp} from "@firebase/firestore";

export interface SavedText {
    id: string;
    uid: string;
    generatedText: string;
    originalText: string;
    date: FieldValue;
    title: string;
    gradeLevel: string;
    language: string;
    notes: string;
    saved: boolean; // I can save everything automatically, but save it to their account if they choose
    archived: boolean; // soft deletion (so they can undo)
    // analytics
    timesDownloaded: number;
    timesEdited: number;
    timesViewed: number;
}

export class SavedTextClass implements SavedText {
    archived: boolean;
    date: FieldValue;
    gradeLevel: string;
    id: string;
    language: string;
    notes: string;
    saved: boolean;
    generatedText: string;
    originalText: string;
    timesDownloaded: number;
    timesEdited: number;
    timesViewed: number;
    title: string;
    uid: string;

    constructor(
        uid: string,
        gradeLevel: string,
        language: string,
        generatedText: string,
        originalText: string,
        title: string = "Untitled",
        notes: string = "",
    ) {
        // random number for id
        this.id = (Date.now() * Math.random() * 10000).toString();
        this.uid = uid;
        this.archived = false;
        this.date = serverTimestamp();
        this.gradeLevel = gradeLevel;
        this.language = language;
        this.saved = false;
        this.generatedText = generatedText;
        this.originalText = originalText;

        // OPTIONAL
        this.title = title;
        this.notes = notes;

        //ANALYTICS
        this.timesDownloaded = 0;
        this.timesEdited = 0;
        this.timesViewed = 0;
    }

    toggleSaved() {
        this.saved = !this.saved;
    }

    toggleArchive() {
        this.archived = !this.archived;
    }

    setNotes(newNote: string) {
        this.notes = newNote;
    }

    addToNotes(note: string) {
        this.notes += note;
    }

    toObject() {
        return {
            id: this.id,
            uid: this.uid,
            archived: this.archived,
            date: this.date,
            gradeLevel: this.gradeLevel,
            language: this.language,
            saved: this.saved,
            generatedText: this.generatedText,
            originalText: this.originalText,
            title: this.title,
            notes: this.notes,
            timesDownloaded: this.timesDownloaded,
            timesEdited: this.timesEdited,
            timesViewed: this.timesViewed,
        }
    }
}

export class User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    // @ts-ignore
    constructor(uid, email, displayName, photoURL) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
    }

    toObject() {
        return {
            uid: this.uid,
            email: this.email,
            displayName: this.displayName,
            photoURL: this.photoURL,
        }


    }

}