import {Configuration, OpenAIApi} from "openai";
import {NextRequest, NextResponse} from 'next/server';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const gradeLevel = body.gradeLevel;
    const language = body.language;

    let prompt = "Rewrite the following at a " + gradeLevel + " reading level: " + 'in ' + language;
    console.log(prompt)
    prompt += body.prompt;
    try {

        const aiResponse = await openai.createChatCompletion(
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    }
                ],
                max_tokens: 2000,
                temperature: 0.9,

            }
        );
        if (!aiResponse || !aiResponse.data || !aiResponse.data.choices || !aiResponse.data.choices[0] || !aiResponse.data.choices[0].message || !aiResponse.data.choices[0].message.content) {
            return NextResponse.json({aiResponse: "[No text returned from AI]"})
        }
        const text = aiResponse.data.choices[0].message.content;
        return NextResponse.json({aiResponse: text}); // What do I put inside the parentheses?
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "catch block", error: error, prompt: prompt})
    }

}