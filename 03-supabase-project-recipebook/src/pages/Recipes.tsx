import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
import FeaturedRecipes from "../components/FeaturedRecipes";
import { Link } from "react-router-dom";
import slugify from "slugify";

const getAllRecipes = async () =>{
    const result = await supabase
    .from("recipes")
    .select("*")
    console.log({data: result.data})
    console.log("Response:",{result})
    return result
  }
  
type GetAllRecipesData = QueryData<ReturnType<typeof getAllRecipes>>
  
export default function Recipes(){
    const [recipes, setRecipes] = useState<GetAllRecipesData>([])

    useEffect(() => {
      getAllRecipes().then((result) => {
        setRecipes(result.data ?? []);
      });
    }, []);
  
    return(
      <>
        <FeaturedRecipes/>
        <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Rezepte:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-neutral-100 rounded-lg shadow-md overflow-hidden"
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
                <p className="text-black">{recipe.description_short}</p>
                <Link to={`/rezept/${slugify(recipe.name, {lower: true})}:${recipe.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
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