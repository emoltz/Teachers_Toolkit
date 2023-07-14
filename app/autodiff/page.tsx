import AutoDiffDialogue from "@/app/autodiff/AutoDiffDialogue";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import {tailwindStyles} from "@/lib/styles";
import Spacer3 from "@/components/layouts/Spacer3";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"

export default function page() {
    return (
        <>
            <TwoColumnLayout column1={<Column1/>} column2={<Column2/>}/>


        </>
    )
}

const Column1 = () => {
    return (
        <>
            <div className={"text-center"}>
                <div>
                    <h1 className={tailwindStyles.heading1}>

                        Automatic Differentiation
                    </h1>
                </div>

                <div className={tailwindStyles.subtitle}>
                    <div>
                        Input your text below and let the AI transform it into any reading level.
                    </div>
                </div>
            </div>
            <Spacer3/>
            <AutoDiffDialogue/>

        </>
    )
}

const Column2 = () => {
    return (
        <>
            <div className={"text-center"}>
                <div className={tailwindStyles.heading1}>
                    Your Recent Generations
                </div>
                <div className={tailwindStyles.subtitle}>
                    <Link
                        href={"/mystuff"}
                    >
                        <Button
                            variant={"ghost"}
                        >

                            See all
                        </Button>
                    </Link>
                </div>
            </div>
            <Spacer3/>
            <div className={"text-center"}>

                <Accordion type="single" collapsible className="w-full" defaultValue={"item-1"}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>
                            Item 1 content
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>
                            Item 2 content
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Item 3</AccordionTrigger>
                        <AccordionContent>
                            Item 3 content
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Spacer3/>
                <div className={"place-items-center grid-cols-2 gap-3"}>

                    <Button
                        variant={"outline"}
                    >
                        Save all
                    </Button>
                    <Button
                        variant={"outline"}
                    >
                        Download all
                    </Button>
                </div>
            </div>
        </>
    )
}