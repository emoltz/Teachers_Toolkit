interface Props{
    column1: JSX.Element;
    column2: JSX.Element;
}
export default function TwoColumnLayout({column1, column2}: Props){
    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/2 p-4">
                {column1}
            </div>
            <div className="md:w-1/2 p-4">
                {column2}
            </div>
        </div>
    )
}
