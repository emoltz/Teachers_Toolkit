import {ReactNode} from "react";

interface ThreeColumnProps {
    firstNode: ReactNode;
    secondNode: ReactNode;
    thirdNode?: ReactNode;
    fourthNode?: ReactNode;
}

export default function ThreeColumn({firstNode, secondNode, thirdNode, fourthNode}: ThreeColumnProps): JSX.Element {
    return (
        <div className={"p-10"}>
            <div className={"grid md:grid-cols-3 grid-cols-1 gap-4"}>
                <div className={"bg-blue-200 p-4"}>
                    <div>
                        {firstNode}
                    </div>
                </div>
                <div className={"bg-blue-200 p-4"}>
                    <div className="">
                        {secondNode}
                    </div>

                </div>
                {thirdNode && (
                    <div className={"bg-blue-200 p-4"}>
                        <div className="">
                            {thirdNode}
                        </div>

                    </div>
                )}
                {fourthNode && (
                    <div className={"bg-blue-200 p-4"}>
                        <div className="">
                            {fourthNode}
                        </div>

                    </div>
                )}

            </div>

        </div>
    )
}