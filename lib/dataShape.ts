import {FieldValue, serverTimestamp} from "@firebase/firestore";

export interface SavedText {
    id: number;
    uid: string;
    text: string;
    date: FieldValue;
    title: string;
    gradeLevel: string; // TODO multiple at a time?
    language: string; // TODO multiple?
    notes: string;
    saved: boolean; // I can save everything automatically, but save it to their account if they choose
    archived: boolean; // soft deletion (so they can undo)
    // analytics
    timesDownloaded: number;
    timesEdited: number;
    timesViewed: number;
}

export interface ResponseText {
    responseText: string;
    gradeLevel: string;
    language?: string;
    title?: string;
}

export class SavedTextClass implements SavedText {
    archived: boolean;
    date: FieldValue;
    gradeLevel: string;
    id: number;
    language: string;
    notes: string;
    saved: boolean;
    text: string;
    timesDownloaded: number;
    timesEdited: number;
    timesViewed: number;
    title: string;
    uid: string;

    constructor(
        uid: string,
        gradeLevel: string,
        language: string,
        notes: string = "",
        text: string,
        title: string = "Untitled",
    ) {
        // random number for id
        this.id = Date.now();
        this.uid = uid;
        this.archived = false;
        this.date = serverTimestamp();
        this.gradeLevel = gradeLevel;
        this.language = language;
        this.saved = false;
        this.text = text;

        // OPTIONAL
        this.title = title;
        this.notes = notes;

        //ANALYTICS
        this.timesDownloaded = 0;
        this.timesEdited = 0;
        this.timesViewed = 0;
    }

    setSaved() {
        this.saved = true;
    }

    setArchived() {
        this.archived = true;
    }

    toObject() {
        return {
            // TODO
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