"use client";
import {useState} from "react";

import AutoDiffDialogue from "@/app/autodiff/AutoDiffDialogue";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import {tailwindStyles} from "@/lib/styles";
import Spacer3 from "@/components/layouts/Spacer3";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {ResponseText} from "@/lib/dataShape";

export default function page() {
    const [savedResponses, setSavedResponses] = useState<ResponseText[]>([]);

    return (
        <>
            <TwoColumnLayout column1={
                <Column1
                    onSaveResponse={(newResponse: ResponseText) => setSavedResponses(prevResponses => [...prevResponses, newResponse])}
                />
            } column2={<Column2
                savedResponses={savedResponses}
            />}/>
        </>
    )
}

interface Column1Props {
    onSaveResponse: (response: ResponseText) => void;
}

const Column1 = ({onSaveResponse}: Column1Props) => {

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
            />

        </>
    )
}

interface Column2Props {
    savedResponses: ResponseText[];
}

const Column2 = ({savedResponses}: Column2Props) => {
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

                <Accordion type="single" collapsible className="w-full" defaultValue={"item-1"}
                >
                    {savedResponses.map((response: ResponseText, index: number) => (
                        <AccordionItem value={index.toString()}>
                            <AccordionTrigger>
                                {response.title} | {response.gradeLevel}
                            </AccordionTrigger>
                            <AccordionContent>
                                {response.responseText}
                                <Spacer3/>
                                <div className={"text-center"}>
                                    <Button
                                    >
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
                <Spacer3/>
                <div className={"flex text-center items-center justify-center space-x-2"}>

                    <Button

                    >
                        Save All
                    </Button>
                    <Button
                        variant={"outline"}
                    >
                        Download All
                    </Button>
                </div>
            </div>
        </>
    )
}