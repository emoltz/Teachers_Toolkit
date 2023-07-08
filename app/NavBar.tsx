export function NavBar() {
    return (
        <nav className={"flex items-center justify-between flex-wrap bg-gray-400 p-6"}>
            <div className={"flex items-center flex-shrink-0 text-white mr-6"}>
                <span className={"font-semibold text-xl tracking-right"}>Teacher's Toolkit</span>
            </div>
            <div className={""}>
                <button id={"menuButton"}
                        className={"flex items-center px-3 py-2 border rounded text-grey-200 border-grey-400 hover:text-white hover:border-white"}>
                    Log In
                </button>
            </div>


        </nav>
    )
}