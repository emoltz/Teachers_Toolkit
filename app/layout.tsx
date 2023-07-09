"use client";
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Analytics} from '@vercel/analytics/react';
import {NavBar} from "@/app/NavBar";
import {ReactNode} from "react";
import {AuthProvider} from "./context";


const inter = Inter({subsets: ['latin']})
// TODO add a footer
// TODO fonts!
// TODO toasts
// TODO add testing suite early
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <html lang="en">

        <AuthProvider>
            <body className={inter.className}>

            <NavBar/>
            <div
                className={"p-3"}
            >
                {children}
            </div>

            </body>
        </AuthProvider>
        <Analytics/>
        </html>
    )
}
