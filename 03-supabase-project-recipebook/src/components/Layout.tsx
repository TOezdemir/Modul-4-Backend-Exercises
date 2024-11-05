import Header from "./Header"
import Hero from "./Hero"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


export default function Layout(){
    return(
        <>
        <Header/>
        <Hero/>
        <Outlet/>
        <Footer/>
        </>
    )
}