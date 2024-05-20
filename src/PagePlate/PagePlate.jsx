import { useMemo, useReducer } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function(props){
    //Structure
    const children = props.children;
    const clean = props.clean ?? false;

    //Component
    const navbar = useMemo( ()=>!clean && <Navbar /> , [clean] );
    const footer = useMemo( ()=>!clean && <Footer /> , [clean] );

    return <>
    <main className="relative min-h-screen flex flex-col bg-gray-800 text-slate-300">
        {navbar}

        {/* The body of the page */}
        <main className="relative grow">
            {children}
        </main>
        {/* The body of the page */}

        {footer}
    </main>
    </>
}