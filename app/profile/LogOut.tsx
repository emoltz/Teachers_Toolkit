"use client"
import {signOut} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function LogOut() {
    return (
        <Button variant={"outline"}
                onClick={() => signOut(auth)}>Sign out</Button>
    )
}