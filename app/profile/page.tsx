"use client"
import LogOut from "@/app/profile/LogOut";
import {tailwindStyles} from "@/lib/styles";
import {useCurrentUser} from "@/lib/hooks";
import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Loading from "@/components/ui/Loading";

export default function page() {
    const {user, loading} = useCurrentUser();
    if (loading){
        return(
            <Loading/>
        )
    }
    if (!user){
        return(
            <div>
                <UserAuthForm/>
            </div>
        )
    }
    return (

        <div>
            <div className={tailwindStyles.heading1}>
                My Profile
            </div>
            <Link href={"/mystuff"}>
                <Button>
                    My Stuff
                </Button>
            </Link>


            <LogOut/>

        </div>
    )
}