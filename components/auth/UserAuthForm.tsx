"use client"
import * as React from "react";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Label} from '@/components/ui/label';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/ui/icons";
import Image from "next/image";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}


export default function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [regMode, setRegMode] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        if (auth) {
            try {
                if (!regMode) {
                    // go into sign up
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log("registered!");
                    setLoggedIn(true)


                } else {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log("signed in!");
                    setLoggedIn(true)
                }
            } catch (e) {
                console.log("Error signing in: ", e);
            } finally {
                setIsLoading(false)
            }
        } else {
            console.warn("Error: Auth is null")
        }

    }

    return (
        <>
            {/*Main container*/}
            <div className={"lg:flex gap-10"}>
                {/*left column*/}
                <div className={"lg:w-1/2 hidden lg:block"}>
                    <Image
                        src={"/robots/auto-diff.svg"}
                        width={2000}
                        height={400}
                        alt={"Robots"}
                        className={"block dark:hidden"}
                    />
                </div>
                {/*right column*/}
                <div className={"lg:p-8 space-y-1"}>
                    <div className="flex flex-col  space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>

                    </div>
                    {/* This `div` wraps the sign in form and applies a grid layout with a gap between grid items (using the `grid gap-6` classes). */}
                    <div
                        className={cn("lg:w-[500px] md:pl-20 md:pr-20", className)} {...props}>
                        {/* This `div` wraps the form inputs and applies a grid layout with a smaller gap between grid items (using the `grid gap-3` classes). */}
                        <div className={cn("grid gap-3", className)} {...props}>

                            {/* This is the form element, which wraps the form inputs and the sign in button. */}

                            <form onSubmit={onSubmit}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                        <Input
                                            id="password"
                                            placeholder="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoCapitalize="none"
                                            autoComplete="current-password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <Button disabled={isLoading}>
                                        {isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                        )}
                                        {!regMode ? "Register" : "Sign In"}

                                    </Button>
                                </div>
                            </form>
                            <div className={"text-sm text-muted-foreground text-center p-1 "}>
                                <Button
                                    onClick={() => setRegMode(!regMode)}
                                    variant={"ghost"}
                                >

                                    {regMode ? " Don't have an account? Register" : " Have an account? Sign in"}
                                </Button>


                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"/>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                  <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                  </span>
                                </div>
                            </div>
                            <Button variant="outline" type="button" disabled={isLoading}>
                                {isLoading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                ) : (
                                    <Icons.google className="mr-2 h-4 w-4"/>
                                )}{" "}
                                Google
                            </Button>
                        </div>
                    </div>

                </div>


            </div>
        </>

    )

}


const LoggedIn = () => {
    return (
        <>
        <div>
            You're logged in!
        </div>
            <div>
                <Button onClick={() => auth.signOut()}>Sign Out</Button>
                <Link href={"/"}>Home</Link>
            </div>
        </>
    )
}