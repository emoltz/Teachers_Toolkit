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
try{

    const aiResponse = await openai.createCompletion(
        {
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 3000,
            temperature: 0.0,
        }
    );
    const text = aiResponse.data.choices[0].text;
    if (!text){
        return NextResponse.json({error: "No text returned from OpenAI"})
    }
    return NextResponse.json({text});
} catch(error){
    console.log(error);
    return NextResponse.json({error: error, prompt: prompt})
}

}