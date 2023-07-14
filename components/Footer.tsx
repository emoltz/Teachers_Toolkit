import Link from "next/link";

export default function Footer() {

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    return (
        <footer className="bg-slate-900 p-3 pb-10">
            <div className="container text-white text-center font-semibold text-md font-sans">
                Teacher's Toolkit
            </div>
            <div className={"italic text-center text-muted-foreground"}>
                {currYear} &copy; Teacher's Toolkit
                <div className={"underline text-blue-500"}>
                    <Link href={"https://github.com/emoltz/Teachers_Toolkit"}>
                        Find an issue? Fix it on GitHub
                    </Link>
                </div>
            </div>


        </footer>
    )
}