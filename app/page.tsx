"use client";
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {ChangeEvent, useState} from "react";

export default function Home() {
    const [text, setText] = useState<string>('');
    const [response, setResponse] = useState<string>('');
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
        console.log(data);
    }


    return (
        <>
            <div className="grid w-full gap-2">
                <Textarea
                    style={{height: '200px'}}
                    placeholder="Type your message here."
                    onChange={handleChange}
                />
            </div>
            <Button
                onClick={handleSubmit}
            >Send message</Button>

            <div>
                {response}
            </div>

        </>

    )
}
