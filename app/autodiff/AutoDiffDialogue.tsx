"use client";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useState} from "react";
import Spacer3 from "@/components/layouts/Spacer3";


interface Props {

}

export default function AutoDiffDialogue({}: Props) {
    const [text, setText] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [generated, setGenerated] = useState<boolean>(false);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)

    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const language = "English";

        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                gradeLevel: "1st Grade",
                language: language,
                prompt: text,
            }),
        });
        const data = await response.json();
        setResponse(data.aiResponse);
        setGenerated(true);

        console.log(data);
    }

    return (
        <>
            {!generated &&
                <>

                    <div className="grid w-full gap-2">
                        <Textarea
                            style={{height: '200px'}}
                            placeholder="Enter text to scaffold."
                            onChange={handleChange}
                        />
                    </div>
                    <Spacer3/>
                    <Options/>
                    <Spacer3/>
                    <Button
                        onClick={handleSubmit}
                    >
                        <div
                            className={"font-sans"}
                        >
                            Generate
                        </div>
                    </Button>
                </>
            }
            {generated &&

                <div>
                    <Spacer3/>
                    <Response responseText={response}
                    />
                    <div className={"text-center items-center"}>

                        <Button
                            onClick={() => {
                                setGenerated(false);
                            }}
                        >
                            Generate Again
                        </Button>
                    </div>
                </div>

            }
        </>
    )
}

const Options = () => {
    return (
        <>
            <div>
                Grade Level
            </div>
            <div>
                Language
            </div>
        </>
    )
}

interface ResponseText {
    responseText: string;
    gradeLevel?: string;
    language?: string;
    title?: string;
}

const Response = ({responseText, gradeLevel, language, title}: ResponseText) => {
    if (!gradeLevel) {
        gradeLevel = "1st Grade";
    }
    if (!language) {
        language = "English";
    }
    if (!title){
        title="New Scaffold";
    }
    return (
        <div className={"p-3"}>
            <div className={"text-xl font-semibold"}>
                {title}
            </div>
            <div className={"text-sm text-gray-700 italic"}>
                <div>

                    {gradeLevel}

                </div>
                <div>
                    {language}
                </div>
            </div>
            <div className={"p-1"}/>
            <div>
                {responseText}

            </div>
            <Button
                variant={"secondary"}
            >
                Save
            </Button>
            <span className={"pr-3"}/>
            <Button
                variant={"ghost"}
            >
                Download
            </Button>
            <div className={"p-5"}/>
            <div className={"text-center"}>


            </div>
        </div>
    )
}