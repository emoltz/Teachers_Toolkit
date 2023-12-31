"use client";
import {useState} from "react";

import AutoDiffDialogue from "@/app/autodiff/AutoDiffDialogue";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import {tailwindStyles} from "@/lib/styles";
import Spacer3 from "@/components/layouts/Spacer3";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {SavedText} from "@/lib/dataShape";
import {useCurrentUser} from "@/lib/hooks";
import {setGeneratedTextToSaved} from "@/lib/firebase";
import {useToast} from "@/components/ui/use-toast"

export default function page() {
    const {user, loading} = useCurrentUser();
    const [savedResponses, setSavedResponses] = useState<SavedText[]>([]);
    const [generated, setGenerated] = useState<boolean>(false);

    return (
        <>
            <TwoColumnLayout
                column1={
                    <Column1
                        onSaveResponse={(newResponse: SavedText) => setSavedResponses(prevResponses => [...prevResponses, newResponse])}
                        onGenerate={(generated: boolean) => setGenerated(generated)}
                        loading={loading}
                    />
                }
                column2={<Column2
                    savedResponses={savedResponses}
                    generated={generated}
                />}/>
        </>
    )
}

interface Column1Props {
    onSaveResponse: (response: SavedText) => void;
    onGenerate: (generated: boolean) => void;
    loading: boolean;
}

const Column1 = ({onSaveResponse, onGenerate, loading}: Column1Props) => {
    return (
        <>
            <div className={"text-center"}>
                <div>
                    <h1 className={tailwindStyles.heading1}>

                        Automatic Differentiation
                    </h1>
                </div>

                <div className={tailwindStyles.subtitle}>
                    <div>
                        Input your text below and let the AI transform it into any reading level.
                    </div>
                </div>
            </div>
            <Spacer3/>
            <AutoDiffDialogue
                onSaveResponse={onSaveResponse}
                onGenerate={() => {
                    onGenerate(true);
                }}
            />

        </>
    )
}

interface Column2Props {
    savedResponses: SavedText[];
    generated: boolean;
}

const Column2 = ({savedResponses, generated}: Column2Props) => {
    const {toast} = useToast();
    const {user, loading} = useCurrentUser();
    const saveSingleResponseHandler = async (savedText: SavedText) => {
        if (!user) {
            console.warn("No user. Source: ", "/auto-diff/page.tsx")
            return;
        }
        await setGeneratedTextToSaved(user, savedText);
    }

    return (
        <>
            <div className={"text-center"}>
                <div className={tailwindStyles.heading1}>
                    Your Recent Generations
                </div>

                <div className={tailwindStyles.subtitle}>
                    <Link
                        href={"/mystuff"}
                    >
                        <Button
                            variant={"ghost"}
                        >

                            See all
                        </Button>
                    </Link>
                </div>
            </div>
            <Spacer3/>
            <div className={"text-center"}>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={"item-1"}
                >
                    {savedResponses.map((response: SavedText, index: number) => (
                        <AccordionItem value={index.toString()}
                                       key={index}
                        >
                            <AccordionTrigger>
                                {response.title} | {response.gradeLevel}
                            </AccordionTrigger>
                            <AccordionContent>
                                {response.generatedText}
                                <Spacer3/>
                                <div className={"text-center"}>
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            saveSingleResponseHandler(response).then(() => {
                                                toast({
                                                    title: "Saved to your stuff",
                                                    description: "Go to your profile to view"
                                                })
                                            })
                                        }}
                                    >
                                        {/*TODO add unsave button option*/}
                                        Save
                                    </Button>
                                    <Button
                                        variant={"ghost"}

                                    >
                                        Download
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                    ))}
                </Accordion>
                {/*<div className={"pb-2"}/>*/}
                {!generated &&
                    // <>
                    //     <div className={"p-3 flex text-center items-center justify-center space-x-2"}>
                    //
                    //         <Button
                    //
                    //         >
                    //             Save All
                    //         </Button>
                    //         <Button
                    //             variant={"outline"}
                    //         >
                    //             Download All
                    //         </Button>
                    //     </div>
                    // </>
                    // :
                    <div className={"text-gray-600 italic border"}>
                        Start generating to see your recent generations here.

                    </div>
                }

            </div>
        </>
    )
}