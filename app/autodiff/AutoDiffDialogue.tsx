"use client";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useState} from "react";
import Spacer3 from "@/components/layouts/Spacer3";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {ResponseText} from '@/lib/dataShape';
import {Icons} from '@/components/ui/icons';
import {Input} from "@/components/ui/input";

interface Props {
    onSaveResponse: (response: ResponseText) => void;
    onGenerate: () => void;
}

export default function AutoDiffDialogue({onSaveResponse, onGenerate}: Props) {
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [generated, setGenerated] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);
    const [readyToGen, setReadyToGen] = useState<boolean>(false);
    const [gradeLevel, setGradeLevel] = useState<string>("");
    const [language, setLanguage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)

    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setGenerating(true);
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
        setGenerating(false);
        const newResponse: ResponseText = {
            responseText: data.aiResponse,
            gradeLevel: gradeLevel,
            language: language,
            title: title ? title : "Untitled",
        };
        onSaveResponse(newResponse);
        setGenerated(true);
        onGenerate();
    }

    return (
        <>
            <div className="grid w-full gap-2">
                <Input
                    placeholder={"Title"}
                    disabled={generating || generated}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <Textarea
                    style={{height: '200px'}}
                    placeholder={generating ? "Generating..." : "Enter text to scaffold."}
                    onChange={handleChange}
                    value={generated ? response : text}
                    disabled={generated || generating}
                />
            </div>
            <Spacer3/>

            <div className={"flex text-center items-center justify-center space-x-2"}>
                <Select
                    onValueChange={(value) => {
                        setGradeLevel(value);
                    }}
                    disabled={generating || generated}
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
                    disabled={generating || generated}
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

            {!generated ?
                // NOT GENERATED
                <div className={"text-center items-center justify-center space-x-2"}>
                    <Button
                        disabled={generating || text.trim() === ''}
                        onClick={handleSubmit}
                    >
                        <div
                            className={"font-sans flex"}
                        >
                            {
                                generating &&
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            }
                            Generate
                        </div>
                    </Button>
                </div>
                :
                // GENERATED
                <>
                    <div className={"text-center items-center grid-cols-3"}>
                        <Button

                            onClick={() => {
                                setGenerated(false)
                            }}
                        >
                            Generate Again
                        </Button>
                    </div>
                </>
            }
        </>
    )
}