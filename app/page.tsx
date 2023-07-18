"use client";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator";
import Image from "next/image";

interface Tool {
    name: string;
    path: string;
    description: string;
    disabled: boolean;
    image: string;
}

export default function Home() {
    const tools: Tool[] = [
        {
            name: "Auto Differentiator",
            path: "/autodiff",
            description: "Automatically scaffold text to a lower grade level.",
            disabled: false,
            image: "/robots/auto-diff.svg"
        },
        {
            name: "Data Analysis Dashboard",
            path: "/data-analysis",
            description: "Analyze data with a variety of tools.",
            disabled: true,
            image: "/robots/3.svg"
        },
        {
            name: "Classroom Generator",
            path: "/classroom-generator",
            description: "Generate quizzes, reading materials, worksheets, and more.",
            disabled: true,
            image: "/robots/2.svg"
        }
    ]
    return (
        <>


            <div className={"p-5"}>
                {/*Heading */}
                <h1 className={"text-3xl font-sans text-gray-800"}>
                    Welcome to Teacher's Toolkit
                </h1>
                <p className={"text-gray-600 "}>
                    A collection of AI tools to help teachers.
                </p>
            </div>
            <Separator/>

            <div
                className={"grid md:grid-cols-3  sm:grid-cols-1  lg:grid-cols-3 gap-5 p-10"}
            >
                {tools.map((tool, index) => (

                    <div className={tool.disabled ? "cursor-not-allowed pointer-events-none" : ""}>
                        <Link href={tool.path} key={index}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <div>
                                            {tool.name}
                                        </div>
                                    </CardTitle>
                                    <CardDescription>{tool.description}
                                        {tool.disabled &&

                                            <div className="pt-1 text-red-400 font-semibold">
                                                Coming Soon
                                            </div>
                                        }
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Image src={tool.image} alt={"A robot"}
                                           width={500}
                                           height={500}
                                           priority
                                           className={"rounded-md object-cover"}
                                    />

                                </CardContent>
                                {/*{tool.disabled &&*/}


                                {/*    <CardFooter>*/}
                                {/*        <div className={"text-gray-600"}>*/}
                                {/*            Coming soon!*/}
                                {/*        </div>*/}
                                {/*    </CardFooter>*/}
                                {/*}*/}
                            </Card>

                        </Link>

                    </div>
                ))}
            </div>
        </>
    )
}