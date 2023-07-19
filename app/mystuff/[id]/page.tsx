"use client";
import {useEffect, useState} from 'react';
import {getGenerationById} from "@/lib/firebase";
import Loading from "@/components/ui/Loading";
import {useCurrentUser} from "@/lib/hooks";
import {SavedText} from "@/lib/dataShape";

export default function Page({params}: { params: { id: string } }) {
    const {user, loading} = useCurrentUser();
    const id = params.id;
    const [generation, setGeneration] = useState<SavedText>()


    useEffect( () => {
        if(user){
            getGenerationById(user!, id).then(setGeneration)
                .catch(error => {
                    console.warn("Error fetching generation (mystuff/[id]) ", error);
                });
        }
    }, [id, user])
    if (loading){
        return <Loading/>
    }

    return (
        <>
            {generation?
                <>
                    {generation.generatedText}


                </>


                :


                <Loading/>}
        </>
    )
}