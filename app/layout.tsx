import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Analytics} from '@vercel/analytics/react';
import {NavBar} from "@/app/NavBar";
import {ReactNode} from "react";
import Footer from "@/components/Footer";


const inter = Inter({subsets: ['latin']})
// TODO add a footer
// TODO toasts
// TODO add testing suite early
export const metadata: Metadata = {
    title: 'Teacher\'s Toolkit',
    description: 'AI Tools for Teachers',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <html lang="en">


            <body className={inter.className}>

            <NavBar/>
            <div
                className={"p-3"}
            >
                {children}
            </div>

            <Footer/>
            </body>

        <Analytics/>
        </html>
    )
}
