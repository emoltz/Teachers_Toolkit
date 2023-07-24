import {Tool} from "@/lib/dataShape"

export const tools: Tool[] = [
    {
        name: "Auto Differentiator",
        path: "/autodiff",
        description: "Automatically scaffold text to a lower or higher grade level.",
        disabled: false,
        image: "/robots/auto-diff.svg"
    },
    {
        name: "Classroom Generator",
        path: "/classroom-generator",
        description: "Generate quizzes, reading materials, worksheets, and more.",
        disabled: true,
        image: "/robots/3.svg"
    },
    {
        name: "Data Analysis Dashboard",
        path: "/data-analysis",
        description: "Analyze data with a variety of tools.",
        disabled: true,
        image: "/robots/2.svg"
    },

]