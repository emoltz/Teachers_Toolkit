"use client";
import {useEffect, useState} from 'react';
import {getGenerationById, isItSaved, toggleSavedGeneration, updateGeneration} from "@/lib/firebase";
import {LoadingText} from "@/components/ui/Loading";
import {useCurrentUser} from "@/lib/hooks";
import {SavedText} from "@/lib/dataShape";
import {tailwindStyles} from "@/lib/styles";
import {cn} from "@/lib/utils";
import TextEditor from "@/app/mystuff/[id]/TextEditor";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast"
import {ArrowArcLeft} from "@phosphor-icons/react";
import Link from "next/link";


export default function Page({params}: { params: { id: string } }) {
    const {user, loading} = useCurrentUser();
    const {toast} = useToast()

    const id = params.id;
    const [generation, setGeneration] = useState<SavedText>()
    const [titleInput, setTitleInput] = useState<string | undefined>("");
    const [updatedText, setUpdatedText] = useState<string | undefined>("");
    const [isSaved, setIsSaved] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            getGenerationById(user, id)
                .then((gen) => {
                    setGeneration(gen);
                    setTitleInput(gen?.title);
                })
            isItSaved(user, id).then(setIsSaved);
        }
    }, [id, user, isSaved])
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
            <Link href={"/mystuff"}>

                <Button
                    variant={"ghost"}
                >
                    <ArrowArcLeft size={16}/>
                    Back
                </Button>
            </Link>
            {generation ?

                <div className={"p-5"}>
                    <div className="flex justify-between">
                        <div className={tailwindStyles.label}>
                            {generation.gradeLevel}
                        </div>
                        <div className={tailwindStyles.label}>
                            {/*@ts-ignore*/}
                            generated {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(generation.date.toDate())}
                        </div>
                        <div className={cn(tailwindStyles.label, "flex")}>
                            status:
                            {
                                isSaved ?
                                    <>
                                        <div className={"text-green-600 pl-1 font-semibold bg-gray-100 rounded-md"}>
                                            <button
                                                onClick={() => {
                                                    toggleSavedGeneration(user, id).then(() => {
                                                        toast({
                                                            title: "Removed from to my stuff!"
                                                        })
                                                        setIsSaved(false)
                                                    })

                                                }}
                                            >

                                                in my stuff
                                            </button>
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div className={"text-red-600 pl-1 font-semibold bg-gray-100 rounded-md"}>
                                            <button
                                                onClick={() => {
                                                    toggleSavedGeneration(user, id).then(() => {
                                                        toast({
                                                            title: "Added to my stuff!"
                                                        })
                                                        setIsSaved(true)
                                                    })
                                                }}
                                            >

                                                not in my stuff
                                            </button>
                                        </div>
                                    </>
                            }

                        </div>
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
                    <div className={"justify-center flex p-3 gap-3"}>
                        {/*{*/}
                        {/*    !isSaved ?*/}
                        {/*        <>*/}
                        {/*            <Button*/}
                        {/*                variant={"ghost"}*/}
                        {/*                onClick={() => {*/}
                        {/*                    toggleSavedGeneration(user, id).then(() => {*/}
                        {/*                        toast({*/}
                        {/*                            title: "Added to My Stuff!",*/}
                        {/*                        })*/}

                        {/*                    })*/}
                        {/*                    setIsSaved(true)*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                Move to My Stuff*/}
                        {/*            </Button>*/}
                        {/*        </>*/}
                        {/*        :*/}
                        {/*        <>*/}
                        {/*            <Button*/}
                        {/*                variant={"destructive"}*/}
                        {/*                onClick={() => {*/}
                        {/*                    toggleSavedGeneration(user, id).then(() => {*/}
                        {/*                        toast({*/}
                        {/*                            title: "Removed from My Stuff!",*/}
                        {/*                        })*/}
                        {/*                    })*/}
                        {/*                    setIsSaved(false)*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                Remove from My Stuff*/}
                        {/*            </Button>*/}

                        {/*        </>*/}
                        {/*}*/}

                        <Button

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