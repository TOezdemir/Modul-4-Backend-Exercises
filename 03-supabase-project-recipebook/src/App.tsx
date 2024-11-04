import Header from "./components/Header"
import Hero from "./components/Hero"
import FeaturedRecipes from "./components/FeaturedRecipes"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
import type { QueryData } from "@supabase/supabase-js"

const getAllRecipes = async () =>{
  const result = await supabase
  .from("recipes")
  .select("*")
  console.log({data: result.data})
  console.log("Response:",{result})
  return result
}

type GetAllRecipesData = QueryData<ReturnType<typeof getAllRecipes>>

function App() {
  const[recipes, setRecipes] = useState<GetAllRecipesData>([])
  useEffect(()=>{
    getAllRecipes().then((result)=>{
      setRecipes(result.data ?? [])
    })
  },[])
console.log(recipes)
  return (
    <div>
      <Header/>
      <Hero/>
      <FeaturedRecipes/>
      <Footer/>
    </div>
  )
}

export default App
