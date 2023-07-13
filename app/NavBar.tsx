"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useCurrentUser} from "@/lib/hooks";
import {Icons} from "@/components/ui/icons";
import * as React from "react";
import {UserCircle} from "@phosphor-icons/react";

export function NavBar() {
    const {user, loading} = useCurrentUser();
    const routes = [
        {
            name: "About",
            path: "/about"
        },
    ]

    return (
        <nav className={"flex items-center flex-wrap bg-slate-950 p-6"}>
            <div className={"cursor-pointer flex items-center flex-shrink-0 text-white mr-6"}>
                <span className={"font-display text-xl tracking-right"}>
                    <Link href={"/"}>
                        Teacher's Toolkit
                    </Link>
                    <span
                        className={" font-mono font-semibold text-sm text-orange-400 pl-2 hover:text-orange-500"}
                    >
                        B E T A
                    </span>
                </span>
            </div>
            <span className={"flex-grow"}/>
            {routes.map((route, index) => (
                <div
                    key={index}
                >
                    <Button className={"text-white"}>
                        <Link href={route.path}>
                            {route.name}
                        </Link>
                    </Button>
                </div>
            ))}

            <div className={""}>
                <Link
                    href={"/login"}
                >

                    <Button id={"menuButton"}
                            variant={"outline"}
                            disabled={loading}
                    >
                        {loading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                ) : (
                                    <UserCircle size={25}/>
                                )}{" "}
                        {user ? "My Stuff" : "Login"}

                    </Button>
                </Link>
            </div>


        </nav>
    )
}