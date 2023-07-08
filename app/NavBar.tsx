import {Button} from "@/components/ui/button";

export function NavBar() {
    return (
        <nav className={"flex items-center justify-between flex-wrap bg-black p-6"}>
            <div className={"flex items-center flex-shrink-0 text-white mr-6"}>
                <span className={"font-semibold text-xl tracking-right"}>Teacher's Toolkit</span>
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