import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "./firebase";

export function useCurrentUser(): {user: User | null, loading: boolean}{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is logged in
                setUser(currentUser);
            } else {
                // User is logged out
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return {user, loading};
}