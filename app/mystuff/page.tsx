"use client"
import {getSavedGenerations} from "@/lib/firebase";
import {useEffect, useState} from 'react';
import {useCurrentUser} from "@/lib/hooks";
import Loading from "@/components/ui/Loading";
import {SavedText} from "@/lib/dataShape";
import {Button} from "@/components/ui/button";
import MyStuffCard from "@/app/mystuff/MyStuffCard";
import Link from "next/link";
import {tailwindStyles} from "@/lib/styles";
import {ArrowRight} from "@phosphor-icons/react";

export default function page() {
    const {user, loading} = useCurrentUser();
    const [myGenerations, setMyGenerations] = useState<SavedText[]>([]);
    useEffect(() => {
        if (user) {
            getSavedGenerations(user).then(setMyGenerations);
        }
    }, [user])

    if (loading || !myGenerations) {
        return (
            <Loading/>
        )
    }


    return (
        <>
            <div className={tailwindStyles.heading1}>
                <div className="text-center">
                    My Stuff
                </div>
            </div>

            <div className={tailwindStyles.cardGroup}>
                {myGenerations.map((gen: SavedText, index: number) => (
                    <MyStuffCard
                        key={index}
                        title={gen.title}
                        genText={gen.generatedText}
                        gradeLevel={gen.gradeLevel}

                    />
                ))}
            </div>
            <div className="flex justify-end">
                <Link href={"/mystuff/others"}>

                    <Button
                        variant={"ghost"}
                    >
                        <div className="text-muted-foreground pr-2">

                            All generations
                        </div>
                        <ArrowRight size={20} color="#adadad"/>

                    </Button>
                </Link>
            </div>
        </>
    )
}