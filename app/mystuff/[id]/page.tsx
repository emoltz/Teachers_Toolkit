"use client";
import {useEffect, useState} from 'react';
import {getGenerationById, updateGeneration} from "@/lib/firebase";
import {LoadingText} from "@/components/ui/Loading";
import {useCurrentUser} from "@/lib/hooks";
import {SavedText} from "@/lib/dataShape";
import {tailwindStyles} from "@/lib/styles";
import {cn} from "@/lib/utils";
import TextEditor from "@/app/mystuff/[id]/TextEditor";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast"


export default function Page({params}: { params: { id: string } }) {
    const {user, loading} = useCurrentUser();
    const {toast} = useToast()

    const id = params.id;
    const [generation, setGeneration] = useState<SavedText>()
    const [titleInput, setTitleInput] = useState<string | undefined>("");
    const [updatedText, setUpdatedText] = useState<string | undefined>("");


    useEffect(() => {
        if (user) {
            getGenerationById(user!, id)
                .then((gen) => {
                    setGeneration(gen);
                    setTitleInput(gen?.title);
                })

        }
    }, [id, user])
    if (loading) {
        return <LoadingText/>
    }

    const handleTitleInputChange = (e: any) => {
        setTitleInput(e.target.value);
    }

    const handleSave = async () => {
        if (user && generation) {
            const updatedGeneration: SavedText = {
                ...generation,
                title: titleInput || generation.title,
                generatedText: updatedText || generation.generatedText,

            };
            await updateGeneration(user, id, updatedGeneration);
        }
    }

    return (
        <>
            {generation ?

                <div className={"p-5"}>
                    <div className={"text-muted-foreground text-sm p-2"}>
                        {generation.gradeLevel}
                    </div>
                    <div className={cn(tailwindStyles.heading1, "pb-2")}>
                        <Input
                            type={"text"}
                            value={titleInput}
                            onChange={handleTitleInputChange}
                        />

                    </div>
                    <div className={"text-muted-foreground p-2 bg-slate-100"}>
                        <TextEditor
                            text={generation.generatedText}
                            onTextChange={setUpdatedText}
                        />
                    </div>
                    <div className={"justify-center flex p-3"}>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                handleSave().then(r => {
                                    toast({
                                        title: "Changes saved!",
                                    })
                                });

                            }}
                        >
                            Save Changes
                        </Button>
                    </div>


                </div>


                :


                <LoadingText/>}
        </>
    )
}