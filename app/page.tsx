

export default function Home() {
    return (
        <>
            <div className={"p-3 text-2xl"}>

                Hello World!
            </div>
            <div className={"p-3"}>

                <button className={"p-3 border rounded bg-red-100"}>
                    <a href={"/profile"}>Log In</a>
                </button>
            </div>
        </>
    )
}
