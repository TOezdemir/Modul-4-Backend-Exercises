import { useState, useEffect, useRef, ElementRef } from "react";
import { supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
import FeaturedRecipes from "../components/FeaturedRecipes";
import { Link } from "react-router-dom";
import slugify from "slugify";


export default function Recipes(){

type GetAllRecipesData = QueryData<ReturnType<typeof getAllRecipes>>

const getAllRecipes = async () =>{
    const result = await supabase
    .from("recipes")
    .select("*")
    .like("name", `%${searchText}%`)
    console.log({data: result.data})
    console.log("Response:",{result})
    return result
  }

    const [recipes, setRecipes] = useState<GetAllRecipesData>([])
    const [searchText, setSearchText] = useState("")
    const inputRef = useRef<ElementRef<"input">>(null)

    useEffect(() => {
      getAllRecipes().then((result) => {
        setRecipes(result.data ?? []);
      });
    }, [searchText]);

    const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      const value = inputRef.current?.value || ""
      setSearchText(value)
      console.log(searchText)
    }
  
    return(
      <>
        <FeaturedRecipes/>
        <div className="container mx-auto">
        <form 
        onSubmit={handleSearch}
        className="flex items-center justify-center mb-8"
        >
          <input 
          ref={inputRef} 
          type="text"
          className="border border-gray-400 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-4 w-full max-w-xs" />
          <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >Suche
          </button>
        </form>
        </div>
        <div className="container mx-auto py-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Rezepte:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-neutral-100 rounded-lg shadow-md overflow-hidden relative"
            >
              {/* && fragt nur nach Wahrheit ab - benötigt keinen "else" */}
              {recipe.image_url && 
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-base text-black">{recipe.description_short}</p>
                <Link to={`/rezept/${slugify(recipe.name, {lower: true})}/${recipe.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded mt-4 absolute bottom-4 left-4">
                  Zum Rezept
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    );
}