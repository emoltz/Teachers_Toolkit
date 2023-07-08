import {Button} from "@/components/ui/button";

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
        <nav className={"flex items-center justify-between flex-wrap bg-black p-6"}>
            <div className={"flex items-center flex-shrink-0 text-white mr-6"}>
                <span className={"font-semibold text-xl tracking-right"}>
                    Teacher's Toolkit
                    <span
                        className={"font-mono text-sm text-orange-400 pl-2"}
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