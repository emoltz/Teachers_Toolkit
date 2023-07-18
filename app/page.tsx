"use client";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {tools} from "@/lib/tools"

interface Tool {
    name: string;
    path: string;
    description: string;
    disabled: boolean;
    image: string;
}

export default function Home() {

    return (
        <>


            <div className={"p-5"}>
                {/*Heading */}
                <h1 className={"text-3xl font-sans text-gray-800"}>
                    Welcome to Teacher's Toolkit
                </h1>
                <div className={"text-gray-600 "}>
                    A collection of AI tools to help teachers.
                </div>
            </div>
            <Separator/>

            <div
                className={"grid md:grid-cols-3  sm:grid-cols-1  lg:grid-cols-3 gap-5 p-10"}
            >
                {tools.map((tool, index) => (

                    <div className={tool.disabled ? "cursor-not-allowed pointer-events-none" : ""}
                         key={index}
                    >
                        <Link href={tool.path}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <div>
                                            {tool.name}
                                        </div>
                                    </CardTitle>
                                    <CardDescription>{tool.description}
                                        {tool.disabled &&

                                            <span className="pt-1 pl-3 text-red-400 font-semibold">
                                                Coming Soon
                                            </span>
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
                            </Card>

                        </Link>

                    </div>
                ))}
            </div>
        </>
    )
}