"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {
    const tools = [
        {
            name: "AutoDiff",
            path: "/autodiff",
            description: "Automatically scaffold text to a lower grade level."
        }
    ]

    return (
        <>
            {tools.map((tool) => (
                <div>
                    <Button className={"text-white"}>
                        <Link href={tool.path}>
                            {tool.name}
                        </Link>
                    </Button>
                    {tool.description}
                </div>
            ))}

        </>

    )
}