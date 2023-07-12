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
                            placeholder="Type your message here."
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
                        handleToggle={setGenerated}
                    />
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
    handleToggle: (tog:boolean) => void;
}

const Response = ({responseText, gradeLevel, language, handleToggle}: ResponseText) => {
    if (!gradeLevel) {
        gradeLevel = "1st Grade";
    }
    if (!language) {
        language = "English";
    }
    return (
        <div className={"p-3"}>
            <div >
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

            <Button
                onClick={() => {handleToggle(false)}}
            >
                Generate Again
            </Button>
            </div>
        </div>
    )
}