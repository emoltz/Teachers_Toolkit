"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useCurrentUser} from "@/lib/hooks";
import {Icons} from "@/components/ui/icons";
import * as React from "react";
import {useState} from "react";
import {List, UserCircle} from "@phosphor-icons/react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger,} from "@/components/ui/sheet";


export function NavBar() {
    const {user, loading} = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

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
            <div className={"flex"}>
                <div className={"block lg:hidden md:hidden sm:hidden"}>
                    {/*Hamburger*/}
                    <Sheet>
                        <SheetTrigger>
                            <div onClick={() => setIsOpen(!isOpen)}
                                 className={"flex items-center px-3 py-2 text-white rounded hover:text-white hover:border-white"}
                            >
                                <List size={25}/>

                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                Links
                            </SheetHeader>
                            <SheetDescription>

                            </SheetDescription>
                            {routes.map((route, index) => (
                                <div
                                    key={index}>

                                    <Link
                                        href={route.path}>
                                        {route.name}
                                    </Link>
                                </div>
                            ))}
                            <div>

                                <Link
                                    href={"/login"}
                                >
                                    Profile/Login
                                </Link>
                            </div>


                        </SheetContent>
                    </Sheet>
                </div>
                <div className={"sm:block hidden"}>

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
                </div>

                <div className={"sm:block hidden"}>
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
                            )}
                            {user ? "My Stuff" : "Login"}

                        </Button>
                    </Link>
                </div>

            </div>

        </nav>
    )
}