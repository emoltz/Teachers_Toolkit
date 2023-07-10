"use client";
import ThreeColumn from "@/components/layouts/ThreeColumn";

export default function Home() {
    return (
        <>
            <ThreeColumn
                firstNode={<SomeText/>}
                secondNode={<SomeText/>}
                thirdNode={<SomeText/>}
            />
        </>

    )
}

function SomeText() {
    return (
        <>
            Some text!
        </>
    )
}