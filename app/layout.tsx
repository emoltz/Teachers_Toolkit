import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Analytics} from '@vercel/analytics/react';
import {NavBar} from "@/app/NavBar";
import {ReactNode} from "react";
import Footer from "@/components/Footer";
import {Toaster} from "@/components/ui/toaster"


const inter = Inter({subsets: ['latin']})
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
            <main
                className={"p-3"}
            >
                {children}
            </main>
            <Toaster/>


            <Footer/>
            </body>

        <Analytics/>
        </html>
    )
}
