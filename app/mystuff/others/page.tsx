"use client";
import {useCurrentUser} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {SavedText} from "@/lib/dataShape";
import {getAllGenerations} from "@/lib/firebase";
import Loading from "@/components/ui/Loading";
import MyStuffCard from "@/app/mystuff/MyStuffCard";
import {tailwindStyles} from "@/lib/styles";
import {Button} from "@/components/ui/button";
import {ArrowArcLeft} from "@phosphor-icons/react";
import Link from "next/link";
import UserAuthForm from "@/components/auth/UserAuthForm";

export default function page() {
    const {user, loading} = useCurrentUser();
    const [myGenerations, setMyGenerations] = useState<SavedText[]>([]);
    useEffect(() => {
        if (user) {
            getAllGenerations(user).then(setMyGenerations);
        }
    }, [user])


    if (loading || !myGenerations) {
        return (
            <Loading/>
        )
    }
    if (!user) {
        return (
            <UserAuthForm/>
        )
    }
    return (
        <>
            <Link href={"/mystuff"}>

                <Button variant={"ghost"}>
                    <ArrowArcLeft size={20} color="#919191"/>
                    <div className="text-muted-foreground pl-2">
                        Back
                    </div>
                </Button>
            </Link>
            <div className={tailwindStyles.cardGroup}>
                {myGenerations.map((gen: SavedText, index: number) => (
                    <div key={index}>
                        <MyStuffCard
                            title={gen.title}
                            genText={gen.generatedText}
                            gradeLevel={gen.gradeLevel}
                            id={gen.id}

                        />
                    </div>
                ))}
            </div>
        </>
    )
}