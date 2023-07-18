"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useCurrentUser} from "@/lib/hooks";
import {Icons} from "@/components/ui/icons";
import * as React from "react";
import {useState} from "react";
import {List, UserCircle} from "@phosphor-icons/react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger,} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {Tool} from "@/lib/dataShape"
import {tools} from "@/lib/tools"
import {cn} from "@/lib/utils";
import {tailwindStyles} from "@/lib/styles";
import {Separator} from "@/components/ui/separator"


export function NavBar() {
    const {user, loading} = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);


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
                                <div className={tailwindStyles.heading1}>

                                    Site Map
                                </div>
                            </SheetHeader>
                            <SheetDescription>

                            </SheetDescription>
                            {tools.map((tool: Tool, index) => (
                                <div key={index}>
                                    {!tool.disabled &&
                                        <div

                                        >
                                            <Link
                                                href={tool.path}>
                                                {tool.name}
                                            </Link>
                                        </div>
                                    }
                                </div>
                            ))}
                            <Separator/>
                            <div className="">
                                <Link href={"mystuff"}>
                                    My Stuff
                                </Link>
                            </div>
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
                <div className="pr-3 sm:block hidden">

                    <NavigationMenu>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                            <NavigationMenuContent
                                // className={"origin-top-right right-0"}
                            >
                                <ul className={"flex-auto w-[200px] "}>
                                    {tools.map((tool: Tool) => {
                                        return (
                                            <div key={tool.name}>
                                                {!tool.disabled &&

                                                    <ListItem

                                                        title={tool.name}
                                                        href={tool.path}
                                                    >
                                                        {tool.description}

                                                    </ListItem>
                                                }
                                            </div>
                                        )
                                    })}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenu>
                </div>

                <div className={"sm:block hidden"}>
                    <Link
                        href={user ? "/profile" : "/login"}
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
                            {user ? "Profile" : "Login"}

                        </Button>
                    </Link>
                </div>

            </div>

        </nav>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"