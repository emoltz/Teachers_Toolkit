"use client";
import UserAuthForm from "@/components/auth/UserAuthForm";
import * as React from "react";
import {useCurrentUser} from "@/lib/hooks";
import {Button} from "@/components/ui/button";
import {signOut} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import Loading from "@/components/ui/Loading";

export default function page() {
    const {user, loading} = useCurrentUser();
    if (loading){
        return (
            <Loading/>
        )
    }

    if (user){
        return (
            <>
               You are logged in.
                <div>

                    <Button variant={"outline"}
                            onClick={() => signOut(auth)}>Sign out</Button>
                </div>
            </>
        )
    }
    else{
        return(
            <div className={"p-3"}>

                    <UserAuthForm/>


        </div>
        )
    }

}
