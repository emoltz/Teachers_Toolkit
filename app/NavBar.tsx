import {Button} from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
    const routes = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Contact",
            path: "/contact"

        },
        {
            name: "Login",
            path: "/login"
        }
    ]

    return (
        <nav className={"flex items-center justify-between flex-wrap bg-gray-700 p-6"}>
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
            <div className={""}>
                <Button id={"menuButton"}
                        variant={"outline"}
                >
                    Log In
                </Button>
            </div>


        </nav>
    )
}