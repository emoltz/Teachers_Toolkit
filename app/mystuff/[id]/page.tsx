"use client";
import {useEffect, useState} from 'react';
import {getGenerationById} from "@/lib/firebase";
import Loading from "@/components/ui/Loading";
import {useCurrentUser} from "@/lib/hooks";
import {SavedText} from "@/lib/dataShape";
import {tailwindStyles} from "@/lib/styles";
import {cn} from "@/lib/utils";
import TextEditor from "@/app/mystuff/[id]/TextEditor";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Page({params}: { params: { id: string } }) {
    const {user, loading} = useCurrentUser();
    const id = params.id;
    const [generation, setGeneration] = useState<SavedText>()


    useEffect(() => {
        if (user) {
            getGenerationById(user!, id).then(setGeneration)
                .catch(error => {
                    console.warn("Error fetching generation (mystuff/[id]) ", error);
                });
        }
    }, [id, user])
    if (loading) {
        return <Loading/>
    }

    return (
        <>
            {generation ?
                <div className={"p-5"}>
                    <div className={cn(tailwindStyles.heading1, "pb-2")}>
                        <Input
                            type={"text"}
                            value={generation.title}
                            onChange={
                                () => {
                                    console.log("changed");
                                }}

                        />
                    </div>
                    <div className={"text-muted-foreground p-2 bg-slate-100"}>
                        <TextEditor
                            text={generation.generatedText}
                        />
                    </div>
                    <div className={"justify-center flex p-3"}>
                        <Button>
                            Save
                        </Button>
                    </div>


                </div>


                :


                <Loading/>}
        </>
    )
}