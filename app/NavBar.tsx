import {Button} from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
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
            {routes.map((route) => (
                <div>
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
                    >
                        Log In
                    </Button>
                </Link>
            </div>


        </nav>
    )
}