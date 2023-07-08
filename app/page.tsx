
import Link from 'next/link';
import {Button} from '../components/ui/button';
export default function Home() {
    return (
        <>
            <div className={"p-3 text-2xl"}>

                Hello World!
            </div>
            <div className={"p-3"}>

                <Button>
                    <Link href={"/profile"}>
                        Hello
                    </Link>

                </Button>
            </div>
        </>
    )
}
