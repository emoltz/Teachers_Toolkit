export interface SavedText{
    id: number;
    uid: string;
    text: string;
    date: Date;
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