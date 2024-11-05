import Header from "./Header"
import Hero from "./Hero"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import FeaturedRecipes from "./FeaturedRecipes"


export default function Layout(){
    return(
        <>
        <Header/>
        <Hero/>
        <FeaturedRecipes/>
        <Outlet/>
        <Footer/>
        </>
    )
}