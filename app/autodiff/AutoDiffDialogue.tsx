"use client";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useState} from "react";
import Spacer3 from "@/components/layouts/Spacer3";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"


interface Props {

}

export default function AutoDiffDialogue({}: Props) {
    const [text, setText] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [generated, setGenerated] = useState<boolean>(false);
    const [gradeLevel, setGradeLevel] = useState<string>("");
    const [language, setLanguage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)

    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();


        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                gradeLevel: gradeLevel,
                language: language,
                prompt: text,
            }),
        });
        const data = await response.json();
        setResponse(data.aiResponse);
        setGenerated(true);

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
                    <div className={"flex space-x-5"}>
                        <Select
                            onValueChange={(value) => {
                                setGradeLevel(value);
                            }}

                        >
                            <SelectTrigger className={"w-[180px]"}>
                                <SelectValue placeholder={"Grade Level"}/>
                            </SelectTrigger>
                            <SelectContent
                                style={{maxHeight: '200px'}}
                            >
                                <SelectItem value={"1st Grade"}

                                >
                                    1st Grade
                                </SelectItem>
                                <SelectItem value={"2nd Grade"}>
                                    2nd Grade
                                </SelectItem>
                                <SelectItem value={"3rd Grade"}>
                                    3rd Grade
                                </SelectItem>
                                <SelectItem value={"4th Grade"}>
                                    4th Grade
                                </SelectItem>
                                <SelectItem value={"5th Grade"}

                                >
                                    5th Grade
                                </SelectItem>
                                <SelectItem value={"6th Grade"}

                                >
                                    6th Grade

                                </SelectItem>
                                <SelectItem value={"7th Grade"}

                                >
                                    7th Grade
                                </SelectItem>
                                <SelectItem value={"8th Grade"}

                                >
                                    8th Grade
                                </SelectItem>
                                <SelectItem value={"9th Grade"}

                                >
                                    9th Grade
                                </SelectItem>
                                <SelectItem value={"10th Grade"}

                                >
                                    10th Grade
                                </SelectItem>
                                <SelectItem value={"11th Grade"}

                                >
                                    11th Grade
                                </SelectItem>
                                <SelectItem value={"12th Grade"}

                                >
                                    12th Grade
                                </SelectItem>

                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(value) => {
                                setLanguage(value);

                            }}
                        >
                            <SelectTrigger className={"w-[180px]"}>
                                <SelectValue placeholder={"Language"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"English"}

                                >
                                    English
                                </SelectItem>
                                <SelectItem value={"Spanish"}
                                >
                                    Spanish
                                </SelectItem>
                                <SelectItem value={"French"}
                                >
                                    French
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
                              gradeLevel={gradeLevel}
                              language={language}

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


interface ResponseText {
    responseText: string;
    gradeLevel: string;
    language: string;
    title?: string;
}

const Response = ({responseText, gradeLevel, language, title}: ResponseText) => {
    if (!title) {
        title = "New Scaffold";
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