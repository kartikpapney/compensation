import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Compensation",
    description: "Explore the current compensation trends in the Software Engineering market",
    icons: {
        icon: "/logo.svg",  // Logo from the public directory
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preload" href="/logo.svg" as="image" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </body>
        </html>
    );
}
