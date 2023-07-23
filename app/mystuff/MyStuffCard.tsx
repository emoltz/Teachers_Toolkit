"use client";
import {Card, CardContent, CardHeader,} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button";
import {tailwindStyles} from "@/lib/styles";
import {useToast} from "@/components/ui/use-toast"
import Link from "next/link";
import {archiveGeneration} from "@/lib/firebase";
import {useCurrentUser} from "@/lib/hooks";


interface Props {
    title: string,
    genText: string,
    gradeLevel: string,
    id: string,
}

// TODO notes, original text
export default function MyStuffCard({title, genText, gradeLevel, id}: Props) {
    const {user, loading} = useCurrentUser();
    const {toast} = useToast();

    return (
        <Dialog>
            <DialogTrigger>

                <Card>
                    <CardHeader>

                        {title}
                    </CardHeader>
                    <CardContent>

                        <div className="text-gray-500 justify-start">
                            <div
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden',
                                }}
                            >
                                {genText}
                            </div>

                        </div>
                    </CardContent>

                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle>
                        <div className="text-center">
                            <div className={tailwindStyles.heading1}>
                                {title}
                            </div>
                            <div className={tailwindStyles.subtitleSmall}>
                                {gradeLevel}
                            </div>
                        </div>

                    </DialogTitle>
                    <DialogDescription>
                        <ScrollArea className={"h-[200px] "}>
                            {genText}
                        </ScrollArea>
                        <div className="text-center flex gap-3 pt-5 justify-end">
                            <Button
                                variant={"outline"}
                                onClick={() => {
                                    navigator.clipboard.writeText(genText).then(() => {
                                        toast({
                                            title: "Copied to clipboard"
                                        })
                                    })
                                }}
                            >
                                Copy
                            </Button>
                            <Button
                                onClick={async () => {
                                    await archiveGeneration(user, id).then(() => {
                                        toast({
                                            title: "Moved to Other"
                                        })
                                    })
                                        .catch((e) => {
                                            toast({
                                                title: "Error",
                                            })
                                        })

                                }}
                                variant={"destructive"}
                            >
                                Archive
                            </Button>
                            <Link
                                href={`/mystuff/${id}`}
                            >

                                <Button

                                >
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}