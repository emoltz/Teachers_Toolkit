"use client";
import AutoDiffDialogue from "@/app/autodiff/AutoDiffDialogue";
import {useState} from "react";

export default function Home() {
    const [result, setResult] = useState("");

    return (
        <>
            <AutoDiffDialogue/>
        </>

    )
}

function Result(){
        return (
            <>
                    Result

            </>
        )
}