import UserAuthForm from "@/components/auth/UserAuthForm";
import {Metadata} from "next";
import * as React from "react";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login to the app",
}
export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <UserAuthForm/>
            </Suspense>


        </>
    )
}